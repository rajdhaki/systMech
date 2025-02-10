import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { dbConnect } from './dbConnect.js'
import {systmetch} from './useSchema.js'
import { Blog } from './blogCollection.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Update Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    // Generate a unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg'
    cb(null, uniqueSuffix + ext)
  }
})

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    // Allow only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Not an image! Please upload an image.'), false)
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
}).fields([
  { name: 'img', maxCount: 1 },
  { name: 'additionalImg0', maxCount: 1 },
  { name: 'additionalImg1', maxCount: 1 },
  { name: 'additionalImg2', maxCount: 1 },
  { name: 'additionalImg3', maxCount: 1 },
  { name: 'additionalImg4', maxCount: 1 },
])

const app = express()
dotenv.config()

// Place this before defining any routes
const corsOptions = {
    origin: [
        'https://systmech.vercel.app',
        'https://systmech.onrender.com',
        'http://localhost:5173'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Add preflight handler for all routes
app.options('*', cors(corsOptions));

// Other middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Error handling middleware
app.use((error, req, res, next) => {
    if (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: error.message || 'Internal Server Error',
            error: error
        });
    }
    next();
});

// Add a route to check if images are accessible
app.get('/check-image/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, 'uploads', filename);
  
  if (fs.existsSync(filepath)) {
    res.json({ exists: true, path: filepath });
  } else {
    res.json({ exists: false, path: filepath });
  }
});

app.get('/', (req, res) => {
    res.send("Hello there")
})


app.post('/creatUser', (req, res) => {
console.log(req.body);

    const User = new systmetch(req.body)
    User.save().then(() => { res.status(201); console.log(User) }).catch((e) => res.status(400))
    res.send(User)

})

app.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await systmetch.findOne({ email: email });
        console.log(user)

        if (user.password === password) {
            console.log("login");
            return res.send({ "message": "login successfully" });
        }
        else {
            console.log("password is wrong");

            return res.status(404).send("password is wrong");

        }

    } catch (e) {
        console.log(e)
        res.status(404).send("User Not Found")
    }
})

// Add OPTIONS handler for the /post endpoint
app.options('/post', cors());

app.post('/post', upload, async (req, res) => {
    try {
        // Enable CORS for this specific route
        res.header('Access-Control-Allow-Origin', 'https://systmech.vercel.app');
        res.header('Access-Control-Allow-Methods', 'POST');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        const { headings } = req.body;
        
        let parsedHeadings = [];
        try {
            parsedHeadings = headings ? JSON.parse(headings) : [];
        } catch (error) {
            console.error('Error parsing headings:', error);
        }

        const imgUrl = req.files?.['img']?.[0]?.filename 
            ? `uploads/${req.files['img'][0].filename}` 
            : '';

        const newPost = new Blog({
            imgUrl,
            additionalImages: [],
            headings: parsedHeadings.map(heading => ({
                title: heading.title || '',
                detail: heading.detail || '',
                bulletPoints: Array.isArray(heading.bulletPoints) ? 
                    heading.bulletPoints.filter(Boolean) : []
            }))
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);

    } catch (error) {
        console.error('Post creation error:', error);
        res.status(500).json({
            message: 'Error creating blog post',
            error: error.message
        });
    }
});


app.get('/post', async (req, res) => {
    try {
        const getData = await Blog.find()
        res.send(getData)
    } catch (error) {
        console.log(error)
    }
})

// Add this new route for fetching individual blog posts
app.get('/post/:id', async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Add this route for updating blog posts
app.put('/post/:id', upload, async (req, res) => {
    try {
        const { id } = req.params;
        const { headings } = req.body;

        if (!headings) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const parsedHeadings = JSON.parse(headings);

        let updateData = {
            headings: parsedHeadings
        };

        if (req.files['img']) {
            updateData.imgUrl = req.files['img'][0].path;
        }

        const additionalImages = [];
        for (let i = 0; i < 5; i++) {
            const fieldName = `additionalImg${i}`;
            if (req.files[fieldName]) {
                additionalImages.push(req.files[fieldName][0].path);
            }
        }

        if (additionalImages.length > 0) {
            updateData.additionalImages = additionalImages;
        }

        const updatedPost = await Blog.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ message: "Blog post not found" });
        }

        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Add this route for deleting blog posts
app.delete('/post/:id', async (req, res) => {
    try {
        const deletedPost = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Add health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// Start server with error handling
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running on port ${process.env.PORT || 8000}`);
}).on('error', (err) => {
    console.error('Server error:', err);
});