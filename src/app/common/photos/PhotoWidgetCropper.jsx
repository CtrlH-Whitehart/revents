import React from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; 
 
export default function PhotoWdigetCropper({ setImage, imagePreview}) {
    let cropper;
 
   const onCropperInit = (component) => {
      cropper = component;
   };
 
   const cropImage = () => {
      // cropper.getCroppedCanvas().toDataURL()
      if (cropper && typeof cropper.getCroppedCanvas() === 'undefined') {
         return;
      }
      cropper.getCroppedCanvas().toBlob((blob) => {
         setImage(blob);
      }, 'image/jpeg');
   };
     
    return (
        <Cropper
            ref={cropper}
            src={imagePreview}
            style={{height: 200, width: '100%'}}
            // Cropper.js options
            initialAspectRatio={1}
            preview='.img-preview'
            guides={false}
            viewMode={1}
            dragMode='move'
            scalable={true}
            crop={cropImage}
            cropBoxMovable={true}
            cropBoxResizable={true}         onInitialized={onCropperInit}
        />
    );
}