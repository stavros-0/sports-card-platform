import { useDropzone } from "react-dropzone";
import {useState, useCallback} from "react";


export default function DropZone({handleImageUpload}: {handleImageUpload : (file: File) => void}){

    const [files, setFiles] = useState<(File & { preview: string })[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {

        if (acceptedFiles?.length){
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map((file) => 
                    Object.assign(file, {preview: URL.createObjectURL(file)})
                ),
            ]);
            acceptedFiles.forEach((file) => handleImageUpload(file));
        }
         
    }, [handleImageUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return(
        <>
        <div {...getRootProps()} className="rounded-lg border-2 border-gray-200 border-dashed mt-6 p-4 min-h-[180px] flex flex-col items-center justify-center text-center cursor-pointer">
                <input {...getInputProps()} />
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 mb-4 fill-gray-600 inline-block" viewBox="0 0 32 32">
                <path
                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                    data-original="#000000" />
                <path
                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                    data-original="#000000" />
                </svg>
                {isDragActive ?
                    (<p className="text-sm text-gray-600">Drop some files here</p>)
                    :
                    (<p className="text-sm text-gray-600">Drag 'n' drop files here, or click to select files</p>)
                }
            </div>
            <ul className="grid grid-cols-3 gap-1 mt-4">
                {files.map((file) => (
                    <li key={file.name} className="text-xs text-gray-500">{file.name}
                        <img src={file.preview} alt='' className="mt-2 w-20 h-20 object-cover"/>
                    </li>
                ))}
            </ul>
            </>
    );  
}