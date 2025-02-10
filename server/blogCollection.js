import mongoose from "mongoose"
const headingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  detail: {
    type: String,
    required: false,
  },
  bulletPoints: [String] // Add this line for bullet points
});

const blogSchema = new mongoose.Schema({
    imgUrl: {
      type: String,
      required: false,
    },
    additionalImages: [String],
    headings: [headingSchema],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }, { timestamps: true });

const Blog = new mongoose.model("post", blogSchema)

export {Blog}
