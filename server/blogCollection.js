import mongoose from "mongoose"
const headingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  bulletPoints: [String] // Add this line for bullet points
});

const blogSchema = new mongoose.Schema({
    imgUrl: {
      type: String,
      required: true,
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
