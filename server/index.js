import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { dbConnect } from './dbConnect.js'
import {systmetch} from './useSchema.js'
import { Blog } from './blogCollection.js'
import multer from 'multer'


// Update the Multer configuration
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    // You can add file type validation here if needed
    cb(null, true);
  }
}).fields([
  { name: 'img', maxCount: 1 },
  { name: 'additionalImg0', maxCount: 1 },
  { name: 'additionalImg1', maxCount: 1 },
  { name: 'additionalImg2', maxCount: 1 },
  { name: 'additionalImg3', maxCount: 1 },
  { name: 'additionalImg4', maxCount: 1 },
  // Add more fields as needed
]);

dotenv.config()
const PORT = process.env.PORT || 8000

const app = express()
dbConnect()
app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
    res.send("Hello there")
})


app.post('/creatUser', (req, res) => {

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

app.post('/post', upload, async (req, res) => {
    try {
        const { headings } = req.body;
        const imgUrl = req.files['img'] ? req.files['img'][0].path : null;

        if (!headings || !imgUrl) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const parsedHeadings = JSON.parse(headings);

        const additionalImages = [];
        for (let i = 0; i < 5; i++) {
            const fieldName = `additionalImg${i}`;
            if (req.files[fieldName]) {
                additionalImages.push(req.files[fieldName][0].path);
            }
        }

        const newPost = new Blog({
            imgUrl,
            additionalImages,
            headings: parsedHeadings
        });

        const savedPost = await newPost.save();
        
        console.log(savedPost);
        res.status(201).json(savedPost);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
})


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

app.listen(PORT, ()=>console.log(`app is running at ${PORT}`))