import { useEffect, useState } from "react"

function UploadForm({form, handleFormChange}) {

    const [urlInput, setUrlInput] = useState('')

    const urtInputHandler = (e) => {
        setUrlInput(e.target.value)
    }

    const closeUploadForm = (e) => {
        handleFormChange('none')
    }

    useEffect(() => {
        document.addEventListener('keydown' ,function(e) {
            if(e.code == 'Escape') {
                closeUploadForm()
            }
        })
    },[])

    if(form=="open") {
        return (
            <div className="upload-form-wrapper">
                <form className="upload-form">
                    <label className="form__pair">
                        Загрузите изображение с вашего компьютера
                        <input type="file"/>
                    </label>
                    <label className="form__pair">
                        Или вставьте ссылку на изображение 
                        <input type="url" value={urlInput} onChange={urtInputHandler} placeholder="hhtps://example.com" id="url-input"/>
                    </label>
                    <div className="form__buttons">
                        <button className="form__button">
                            Open image
                        </button>
                        <button onClick={closeUploadForm} className="form__button">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        )
    }
    
}

export default UploadForm