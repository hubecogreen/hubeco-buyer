import React, { useState } from 'react'
import  Link  from 'next/link' // Corrected import statement for Link
// Removed incorrect import of Link with incorrect casing
import Image from "next/image";
const PopupImage = ({ url }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleClickOpen = () => {
    setOpen(true)
    setLoading(true) // Reset loading state when opening the dialog
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleContentLoad = () => {
    setLoading(false) // Stop loading when content (PDF or image) is fully loaded
  }

  const fileType = url.split('.').pop().toLowerCase()

  return (
    <>
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault()
          handleClickOpen()
        }}
        className="font-bold text-[#B90647] hover:text-[#019583]"
        // style={{ color: '#B90647' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#019583')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#B90647')}
      >
        View
      </Link>

      {open && (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-[1000] overflow-auto">

        <div className="bg-white w-[90%] max-w-[900px] rounded-lg p-5 relative max-h-[90vh] overflow-auto">

        <div className="flex justify-between items-center">
              <h2 className="m-0">File Preview</h2>
              <button
                onClick={handleClose}
                className="bg-transparent border-none text-2xl cursor-pointer"
              >
                &times;
              </button>
            </div>


            <div className="mt-5 max-h-[calc(90vh-60px)] overflow-y-auto">

              {loading && (
                <div className="flex justify-center items-center h-[500px]">

                  <div className="loader"></div>
                </div>
              )}

              {fileType === 'pdf' ? (
                <iframe
                  src={`${(url)}`}
                  width="100%"
                  height="500px"
                  title="PDF Preview"
                  className={`border-none rounded-lg shadow-lg ${loading ? 'hidden' : 'block'}`}
                  onLoad={handleContentLoad} // No iframe document access
                />
              ) : fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' ? (
              <div className="max-h-[500px] overflow-y-auto scrollbar-thin">
                  <Image
                    src={url}
                    alt="File Preview"
                    height={500}
                    width={500}
                    className={`max-w-full h-auto ${loading ? 'hidden' : 'block'} rounded-lg shadow-lg`}

                    onError={e => {
                      e.currentTarget.src = '/images/product-placeholder.jpg'
                    }}
                    loading="lazy"
                    onLoad={handleContentLoad} // Load image without internal access
                  />
                </div>
              ) : (
                <p>No preview available for this file type.</p>
              )}
            </div>

            <div className="text-center mt-5">
            <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#B90647] text-white py-2.5 px-5 rounded-lg no-underline inline-block"

                onClick={handleClose}
              >
                Download
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Loader CSS */}
      <style>
        {`
          .loader {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #009886;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 2s linear infinite;
          }

          /* Slim scrollbar for webkit browsers */
          div::-webkit-scrollbar {
            width: 8px;
          }
          div::-webkit-scrollbar-thumb {
            background-color: #B90647;
            border-radius: 4px;
          }
          div::-webkit-scrollbar-track {
            background-color: #f1f1f1;
          }

          /* Slim scrollbar for Firefox */
          div {
            scrollbar-width: thin;
            // scrollbar-color: #B90647 #f1f1f1;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  )
}

export default PopupImage
