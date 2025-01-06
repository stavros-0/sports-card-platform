import { useDropzone } from "react-dropzone";
import {useState, useCallback} from "react";


export default function DropZone(){

    const [files, setFiles] = useState<(File & { preview: string })[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {

        if (acceptedFiles?.length){
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file => 
                    Object.assign(file, {preview: URL.createObjectURL(file)})
                )
            ])

        }
        console.log(acceptedFiles); 
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return(
        <>
        <div {...getRootProps()} className="border border-dashed items-center border-gray-400 p-4 rounded text-center w-1/3">
                <input {...getInputProps()} />
                {isDragActive ?
                    (<p>Drop some files here</p>)
                    :
                    (<p>Drag 'n' drop files here, or click to select files</p>)
                }
            
            </div>
            <ul>
                {files.map(file => (
                    <li key={file.name}>{file.name}</li>
                ))}
            </ul>
            </>
    );  
}