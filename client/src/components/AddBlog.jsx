import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBlog = () => {
  const [sections, setSections] = useState([
    { 
      photo: null, 
      photoPreview: null, 
      heading: { 
        title: '', 
        detail: '',
        bulletPoints: [''] // Initialize with one empty bullet point
      } 
    }
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

  // Add bullet point to a section
  const addBulletPoint = (sectionIndex) => {
    const updatedSections = [...sections];
    if (!updatedSections[sectionIndex].heading.bulletPoints) {
      updatedSections[sectionIndex].heading.bulletPoints = [];
    }
    updatedSections[sectionIndex].heading.bulletPoints.push('');
    setSections(updatedSections);
  };

  // Remove bullet point from a section
  const removeBulletPoint = (sectionIndex, bulletIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].heading.bulletPoints.splice(bulletIndex, 1);
    setSections(updatedSections);
  };

  // Handle bullet point text change
  const handleBulletPointChange = (sectionIndex, bulletIndex, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].heading.bulletPoints[bulletIndex] = value;
    setSections(updatedSections);
  };

  const addSection = () => {
    setSections([...sections, { 
      photo: null, 
      photoPreview: null, 
      heading: { 
        title: '', 
        detail: '',
        bulletPoints: [''] 
      } 
    }]);
  };

  const removeSection = (index) => {
    if (index === 0) return;
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    // Add photos only if they exist
    sections.forEach((section, index) => {
      if (section.photo) {
        if (index === 0) {
          formData.append('img', section.photo);
        } else {
          formData.append(`additionalImg${index - 1}`, section.photo);
        }
      }
    });
    
    // Include all headings without filtering
    const headings = sections.map(section => ({
      title: section.heading.title || '', // Use empty string if title is null/undefined
      detail: section.heading.detail || '', // Use empty string if detail is null/undefined
      bulletPoints: section.heading.bulletPoints.filter(bullet => bullet !== null) || [] // Keep all non-null bullet points
    }));

    formData.append('headings', JSON.stringify(headings));

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/post`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Blog added successfully:', response.data);
      toast.success('Blog post added successfully!');
      // Reset form
      setSections([{ 
        photo: null, 
        photoPreview: null, 
        heading: { 
          title: '', 
          detail: '',
          bulletPoints: [''] 
        } 
      }]);
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
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4 p-4 bg-gray-700 rounded-lg">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  {sectionIndex === 0 ? 'Main Blog Photo' : `Additional Photo ${sectionIndex}`}
                </label>
                <input
                  type="file"
                  onChange={(e) => handleSectionPhotoChange(sectionIndex, e)}
                  className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required={sectionIndex === 0}
                />
                {section.photoPreview && (
                  <img src={section.photoPreview} alt="Preview" className="mt-2 max-w-full h-32 object-cover rounded-md" />
                )}
              </div>

              <input
                type="text"
                placeholder={sectionIndex === 0 ? "Main Heading" : `Additional Heading ${sectionIndex}`}
                value={section.heading.title}
                onChange={(e) => handleSectionHeadingChange(sectionIndex, 'title', e.target.value)}
                className="w-full p-2 bg-gray-600 text-gray-100 border border-gray-500 rounded-md"
                // required={sectionIndex === 0}
              />
              
              <textarea
                placeholder={sectionIndex === 0 ? "Main Detail" : `Additional Detail ${sectionIndex}`}
                value={section.heading.detail}
                onChange={(e) => handleSectionHeadingChange(sectionIndex, 'detail', e.target.value)}
                className="w-full p-2 bg-gray-600 text-gray-100 border border-gray-500 rounded-md"
                rows="3"
                // required={sectionIndex === 0}
              />

              {/* Bullet Points Section */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Bullet Points</label>
                {section.heading.bulletPoints?.map((bullet, bulletIndex) => (
                  <div key={bulletIndex} className="flex items-center space-x-2">
                    <span className="text-gray-300">•</span>
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => handleBulletPointChange(sectionIndex, bulletIndex, e.target.value)}
                      placeholder="Enter bullet point"
                      className="flex-1 p-2 bg-gray-600 text-gray-100 border border-gray-500 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeBulletPoint(sectionIndex, bulletIndex)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addBulletPoint(sectionIndex)}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  + Add Bullet Point
                </button>
              </div>

              {sectionIndex > 0 && (
                <button
                  type="button"
                  onClick={() => removeSection(sectionIndex)}
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