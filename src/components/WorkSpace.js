import React, { useEffect, useState } from 'react'
import UploadForm from './UploadForm'

function WorkSpace({tool, form, handleFormChange}) {

    const [canvas, setCanvas] = useState()
    const [context, setContext] = useState()
    const [mouseState, setMouseState] = useState(false)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [url, setUrl] = useState('')
    const [image, setImage] = useState('')

    let lastX = []
    let lastY = []
    let offsetX
    let offsetY

    const mouseMove = (e) => { 
        lastX.push(e.pageX)
        if(lastX.length > 3) {
            offsetX = lastX[lastX.length-1] - lastX[lastX.length-2]
            lastX.shift()
        }

        lastY.push(e.pageY)

        if(lastY.length > 2) {
            offsetY = lastY[lastY.length-1] - lastY[lastY.length-2]
            lastY.shift()
        }

        if(mouseState && tool == 'hand' && form == 'none') {
            canvas.style.top = Number(canvas.style.top.slice(0,-2)) + (offsetY * -1) + 'px'
            canvas.style.left = Number(canvas.style.left.slice(0,-2)) + (offsetX * -1) + 'px'                
        }
    }

    const mouseDown = (e) => {
        setMouseState(true)
    }

    const mouseUp = (e) => {
        setMouseState(false)
    }

    
    const mouseScroll = (e) => {
        canvas.style.top = Number(canvas.style.top.slice(0,-2)) + (e.deltaY * -1) + 'px'    
        canvas.style.left = Number(canvas.style.left.slice(0,-2)) + (e.deltaX * -1) + 'px'    
    }

    const getCanvas = () => {
        const cnv = document.getElementsByClassName('canvas')[0]
        let ctx = cnv.getContext('2d')
        setContext(ctx)
        setCanvas(cnv)
    }

    const widthChange = (e) => {
        setWidth(e.target.value)
    } 

    const heightChange = (e) => {
        setHeight(e.target.value)
    }

    const urlChange = (e) => {
        setUrl(e.target.value)
    }

    const fileChange = async (e) => {
        let img = await createImageBitmap(e.target.files[0]).then((resp) => {
            return resp
        })
        console.log(img)
        setImage(img)
    }

    const createNewFile = (e) => {
        e.preventDefault()
        handleFormChange('none')

        canvas.style.width = width + 'px'
        canvas.style.height = height + 'px'

        context.fillStyle = "rgb(255,255,255)"
        if(!canvas.style.top) {
            let workspace = document.getElementsByClassName('workspace')[0]

            const w = workspace.offsetWidth
            const h = workspace.offsetHeight
            const cw = canvas.offsetWidth
            const ch = canvas.offsetHeight
             
            canvas.style.top = (h/2 - ch/2) + "px"
            canvas.style.left = (w/2 - cw/2) + "px"
        }
        context.fillRect(0,0,canvas.width,canvas.height)
    }

    const openImage = (e) => {
        e.preventDefault()  
        
        canvas.width = image.width
        canvas.height = image.height
        canvas.style.width = image.width + "px"
        canvas.style.height = image.height + "px"
        if(!canvas.style.top) {
            let workspace = document.getElementsByClassName('workspace')[0]

            const w = workspace.offsetWidth
            const h = workspace.offsetHeight
            const cw = canvas.offsetWidth
            const ch = canvas.offsetHeight
             
            canvas.style.top = (h/2 - ch/2) + "px"
            canvas.style.left = (w/2 - cw/2) + "px"
        }

        context.drawImage(image, 0, 0, image.width, image.height)
        handleFormChange('none')

    }
    
    useEffect(() => {
        getCanvas()
        let workspace = document.getElementsByClassName('workspace')[0]
        workspace.onmousemove = mouseMove
        workspace.onmousedown = mouseDown
        workspace.onmouseup = mouseUp
        workspace.onwheel = mouseScroll
    },[canvas, mouseState, tool,])  


    return (
        <div className='workspace'> 
            <div className='canvas__wrapper'>
                <canvas className='canvas'/>
            </div>
            <UploadForm form={form} handleFormChange={handleFormChange} createNewFile={createNewFile} openImage={openImage} widthChange={widthChange} heightChange={heightChange} urlChange={urlChange} fileChange={fileChange}/>
        </div>
    )
}

export default WorkSpace