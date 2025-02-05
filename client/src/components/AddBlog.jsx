import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddBlog = () => {

  const [sections, setSections] = useState([
    { photo: null, photoPreview: null, heading: { title: '', detail: '' } }
  ]);

  const handleSectionPhotoChange = (index, e) => {
    const file = e.target.files[0];
    const updatedSections = [...sections];
    updatedSections[index].photo = file;
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedSections[index].photoPreview = reader.result;
        setSections(updatedSections);
      };
      reader.readAsDataURL(file);
    } else {
      updatedSections[index].photoPreview = null;
      setSections(updatedSections);
    }
  };

  const handleSectionHeadingChange = (sectionIndex, field, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].heading[field] = value;
    setSections(updatedSections);
  };

  const addSection = () => {
    setSections([...sections, { photo: null, photoPreview: null, heading: { title: '', detail: '' } }]);
  };

  const removeSection = (index) => {
    if (index === 0) return; // Don't remove the first section
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    sections.forEach((section, index) => {
      if (section.photo) {
        if (index === 0) {
          formData.append('img', section.photo);
        } else {
          formData.append(`additionalImg${index - 1}`, section.photo);
        }
      }
    });
    
    const headings = sections.map(section => section.heading);
    formData.append('headings', JSON.stringify(headings));

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/post`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Blog added successfully:', response.data);
      toast.success('Blog post added successfully!');
      // Reset form
      setSections([{ photo: null, photoPreview: null, heading: { title: '', detail: '' } }]);
    } catch (error) {
      console.error('Error adding blog:', error);
      toast.error('Error adding blog post. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-2xl w-full mx-auto my-8 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">Add New Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="space-y-4 p-4 bg-gray-700 rounded-lg">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  {index === 0 ? 'Main Blog Photo' : `Additional Photo ${index}`}
                </label>
                <input
                  type="file"
                  onChange={(e) => handleSectionPhotoChange(index, e)}
                  className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required={index === 0}
                />
                {section.photoPreview && (
                  <img src={section.photoPreview} alt="Preview" className="mt-2 max-w-full h-32 object-cover rounded-md" />
                )}
              </div>

              <input
                type="text"
                placeholder={index === 0 ? "Main Heading" : `Additional Heading ${index}`}
                value={section.heading.title}
                onChange={(e) => handleSectionHeadingChange(index, 'title', e.target.value)}
                className="w-full p-2 bg-gray-600 text-gray-100 border border-gray-500 rounded-md"
                required={index === 0}
              />
              <textarea
                placeholder={index === 0 ? "Main Detail" : `Additional Detail ${index}`}
                value={section.heading.detail}
                onChange={(e) => handleSectionHeadingChange(index, 'detail', e.target.value)}
                className="w-full p-2 bg-gray-600 text-gray-100 border border-gray-500 rounded-md"
                rows="3"
                required={index === 0}
              ></textarea>

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeSection(index)}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Remove Section
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addSection}
            className="w-full py-2 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            Add Another Section
          </button>

          <button
            type="submit"
            className="w-full py-2 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Add Blog
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddBlog;