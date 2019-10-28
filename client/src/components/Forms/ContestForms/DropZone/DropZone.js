import React, { useCallback, useEffect } from 'react'
import {useDropzone} from 'react-dropzone'

import style from './DropZone.module.sass'

import { toast } from 'react-toastify';

import { size, last } from 'lodash';

const DropZone = ({ input }) => {

    const onDrop = useCallback(acceptedFiles => {
        input.onChange(last(acceptedFiles));
    }, []);

    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
    });

    const lastAcceptedFile = last(acceptedFiles);

    useEffect(() => {
       if(size(acceptedFiles) > 1){
           toast.warn(
               ` You cannot upload more than one file. 
               The last file was added.`, {
               position: toast.POSITION.TOP_RIGHT
           });
       }
    }, [acceptedFiles]);

    return (
        <div {...getRootProps()} className={style.dropZone}>

            <label className={style.label}>
                <span>
                    {
                        isDragActive ?
                           "Release to download ..." :
                            "Choose file"
                    }
                </span>
            </label>

            <div className={style.selected}>
                {
                    size(acceptedFiles) ? (
                        <span>
                            { lastAcceptedFile.path }
                        </span>
                    ) : "No File Choosen"
                }
            </div>

            <input {...getInputProps()}/>

        </div>
    )
};
export default DropZone;
