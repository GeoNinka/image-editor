import React, { useEffect, useState } from 'react'
import UploadForm from './UploadForm'

function WorkSpace({tool, form, handleFormChange}) {

    const [canvas, setCanvas] = useState()
    const [context, setContext] = useState()
    const [mouseState, setMouseState] = useState(false)

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

        if(mouseState && tool == 'hand') {
            canvas.style.top = Number(canvas.style.top.slice(0,-2)) + (offsetY * -1) + 'px'
            canvas.style.left = Number(canvas.style.left.slice(0,-2)) + (offsetX * -1) + 'px'                
        }
    }

    const mouseDown = (e) => {
        setMouseState(true)
        console.log(context)
        context.fillStyle = "rgb(200,0,0)"
        context.fillRect(0,0,canvas.width,canvas.height)
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
        ctx.fillStyle = "rgb(255,255,255)"
        if(!cnv.style.top) {
            let workspace = document.getElementsByClassName('workspace')[0]

            let w = workspace.offsetWidth
            let h = workspace.offsetHeight
            let cw = cnv.offsetWidth
            let ch = cnv.offsetHeight
             
            cnv.style.top = (h/2 - ch/2) + "px"
            cnv.style.left = (w/2 - cw/2) + "px"
        }
        ctx.fillRect(0,0,cnv.width,cnv.height)
        setCanvas(cnv)
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
            <UploadForm form={form} handleFormChange={handleFormChange}/>
        </div>
    )
}

export default WorkSpace