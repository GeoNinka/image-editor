import React, { useEffect, useState } from 'react'
import UploadForm from './UploadForm'
import { useKeyPress } from './useKeyPress'
import { useImperativeHandle } from 'react'
import { forwardRef } from 'react'
import { type } from '@testing-library/user-event/dist/type'

function WorkSpace({tool, form, handleFormChange, ref}) {

    const [canvas, setCanvas] = useState()
    const [context, setContext] = useState()
    const [mouseState, setMouseState] = useState(false)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [url, setUrl] = useState('')
    const [image, setImage] = useState('')
    const [control, setControl] = useState()
    const [coorinates, setCoordinates] = useState([0,0])
    const [pixelColor, setPixelColor] = useState() 
    const [blob, setBlob] = useState()
    const [lastCoords, setLastCoords] = useState([[],[]])
    const [message, setMessage] = useState()
    const [imageWidth, setImageWidth] = useState()
    const [imageHeight, setImageHeight] = useState()
    const [hoverCoordinates, setHoverCoordinates] = useState([0,0])
    const [imageMatrix, setImageMatrix] = useState()
    const [range, setRange] = useState(70)
    const [lastX, setLastX] = useState(null)
    const [lastY, setLastY] = useState(null)
    const [resizeMenu, setResizeMenu] = useState(false)
    const [resizeX, setResizeX] = useState()
    const [resizeY, setResizeY] = useState()
    const [resizeCheckbox, setResizeCheckbox] = useState(true)
    const [colorMenu, setColorMenu] = useState(false)
    const [firstColor, setFirstColor] = useState()
    const [secondColor, setSecondColor] = useState()
    const [contrast, setContrast] = useState()
    const [firstColors, setFirstColors] = useState({rgb: '', XYZ: '', Lab: ''})    
    const [secondColors, setSecondColors] = useState({rgb: '', XYZ: '', Lab: ''})
    const [style, setStyle] = useState({color: 'white'})
    
    const [curveMenu, setCurveMenu] = useState('hidden')
    const [curveX1, setCurveX1] = useState(0)
    const [curveX2, setCurveX2] = useState(0)
    const [curveY1, setCurveY1] = useState(255)
    const [curveY2, setCurveY2] = useState(255)
    
    const [previewCheckbox, setPreviewCheckbox] = useState(true)

    const [filterMenu, setFiletMenu] = useState('visible')
    const [filterCheckbox, setFilterCheckbox] = useState(false)
    const [kernel, setKernel] = useState([[[0],[0],[0]],[[0],[1],[0]],[[0],[0],[0]]])
    const [k1, setK1] = useState(0)
    const [k2, setK2] = useState(0)
    const [k3, setK3] = useState(0)
    const [k4, setK4] = useState(0)
    const [k5, setK5] = useState(1)
    const [k6, setK6] = useState(0)
    const [k7, setK7] = useState(0)
    const [k8, setK8] = useState(0)
    const [k9, setK9] = useState(0)

    const [filterType, setFilterType] = useState('same')


    const changeK1 = (e) => {
        setK1(e.target.value)
        console.log(typeof(Number(document.getElementById('k1').value)))
        if (filterCheckbox) {
            filter([
                [Number(document.getElementById('k1').value),Number(document.getElementById('k2').value),Number(document.getElementById('k3').value)],
                [Number(document.getElementById('k4').value),Number(document.getElementById('k5').value),Number(document.getElementById('k6').value)],
                [Number(document.getElementById('k7').value),Number(document.getElementById('k8').value),Number(document.getElementById('k9').value)]
            ])
        }
    }

    const changeK2 = (e) => {
        setK2(e.target.value)
        setKernel([
            [[k1],[e.target.value],[k3]],
            [[k4],[k5],[k6]],
            [[k7],[k8],[k9]]
        ])
        if (filterCheckbox) {
            filter([
                [Number(document.getElementById('k1').value),Number(document.getElementById('k2').value),Number(document.getElementById('k3').value)],
                [Number(document.getElementById('k4').value),Number(document.getElementById('k5').value),Number(document.getElementById('k6').value)],
                [Number(document.getElementById('k7').value),Number(document.getElementById('k8').value),Number(document.getElementById('k9').value)]
            ])
        }
    }

    const changeK3 = (e) => {
        setK3(e.target.value)
        setKernel([
            [[k1],[k2],[e.target.value]],
            [[k4],[k5],[k6]],
            [[k7],[k8],[k9]]
        ])
        if (filterCheckbox) {
            filter([
                [Number(document.getElementById('k1').value),Number(document.getElementById('k2').value),Number(document.getElementById('k3').value)],
                [Number(document.getElementById('k4').value),Number(document.getElementById('k5').value),Number(document.getElementById('k6').value)],
                [Number(document.getElementById('k7').value),Number(document.getElementById('k8').value),Number(document.getElementById('k9').value)]
            ])
        }
    }

    const changeK4 = (e) => {
        setK4(e.target.value)
        setKernel([
            [[k1],[k2],[k3]],
            [[e.target.value],[k5],[k6]],
            [[k7],[k8],[k9]]
        ])
        if (filterCheckbox) {
            filter([
                [Number(document.getElementById('k1').value),Number(document.getElementById('k2').value),Number(document.getElementById('k3').value)],
                [Number(document.getElementById('k4').value),Number(document.getElementById('k5').value),Number(document.getElementById('k6').value)],
                [Number(document.getElementById('k7').value),Number(document.getElementById('k8').value),Number(document.getElementById('k9').value)]
            ])
        }
    }

    const changeK5 = (e) => {
        setK5(e.target.value)
        setKernel([
            [[k1],[k2],[k3]],
            [[k4],[e.target.value],[k6]],
            [[k7],[k8],[k9]]
        ])
        if (filterCheckbox) {
            filter([
                [Number(document.getElementById('k1').value),Number(document.getElementById('k2').value),Number(document.getElementById('k3').value)],
                [Number(document.getElementById('k4').value),Number(document.getElementById('k5').value),Number(document.getElementById('k6').value)],
                [Number(document.getElementById('k7').value),Number(document.getElementById('k8').value),Number(document.getElementById('k9').value)]
            ])
        }
    }

    const changeK6 = (e) => {
        setK6(e.target.value)
        setKernel([
            [[k1],[k2],[k3]],
            [[k4],[k5],[e.target.value]],
            [[k7],[k8],[k9]]
        ])
        if (filterCheckbox) {
            filter([
                [Number(document.getElementById('k1').value),Number(document.getElementById('k2').value),Number(document.getElementById('k3').value)],
                [Number(document.getElementById('k4').value),Number(document.getElementById('k5').value),Number(document.getElementById('k6').value)],
                [Number(document.getElementById('k7').value),Number(document.getElementById('k8').value),Number(document.getElementById('k9').value)]
            ])
        }
    }

    const changeK7 = (e) => {
        setK7(e.target.value)
        setKernel([
            [[k1],[k2],[k3]],
            [[k4],[k5],[k6]],
            [[e.target.value],[k8],[k9]]
        ])
        if (filterCheckbox) {
            filter([
                [Number(document.getElementById('k1').value),Number(document.getElementById('k2').value),Number(document.getElementById('k3').value)],
                [Number(document.getElementById('k4').value),Number(document.getElementById('k5').value),Number(document.getElementById('k6').value)],
                [Number(document.getElementById('k7').value),Number(document.getElementById('k8').value),Number(document.getElementById('k9').value)]
            ])
        }
    }

    const changeK8 = (e) => {
        setK8(e.target.value)
        setKernel([
            [[k1],[k2],[k3]],
            [[k4],[k5],[k6]],
            [[k7],[e.target.value],[k9]]
        ])
        if (filterCheckbox) {
            filter([
                [Number(document.getElementById('k1').value),Number(document.getElementById('k2').value),Number(document.getElementById('k3').value)],
                [Number(document.getElementById('k4').value),Number(document.getElementById('k5').value),Number(document.getElementById('k6').value)],
                [Number(document.getElementById('k7').value),Number(document.getElementById('k8').value),Number(document.getElementById('k9').value)]
            ])
        }
    }

    const changeK9 = (e) => {
        setK9(e.target.value)
        setKernel([
            [[k1],[k2],[k3]],
            [[k4],[k5],[k6]],
            [[k7],[k8],[e.target.value]]
        ])
        if (filterCheckbox) {
            filter([
                [Number(document.getElementById('k1').value),Number(document.getElementById('k2').value),Number(document.getElementById('k3').value)],
                [Number(document.getElementById('k4').value),Number(document.getElementById('k5').value),Number(document.getElementById('k6').value)],
                [Number(document.getElementById('k7').value),Number(document.getElementById('k8').value),Number(document.getElementById('k9').value)]
            ])
        }
    }

    const saveFile = () => {
        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'image.png';
        link.dispatchEvent(
        new MouseEvent('click', { 
            bubbles: true, 
            cancelable: true, 
            view: window 
        })
        );
    }

    useImperativeHandle(ref, () => ({saveFile}))

    
    const rgbToXyz = (r, g, b) => {
        let _r = r / 255;
        let _g = g / 255;
        let _b = b / 255;

        _r = _r > 0.04045 ? Math.pow((_r + 0.055) / 1.055, 2.4) : _r / 12.92;
        _g = _g > 0.04045 ? Math.pow((_g + 0.055) / 1.055, 2.4) : _g / 12.92;
        _b = _b > 0.04045 ? Math.pow((_b + 0.055) / 1.055, 2.4) : _b / 12.92;

        _r *= 100;
        _g *= 100;
        _b *= 100;

        let x = Math.round((_r * 0.4124564 + _g * 0.3575761 + _b * 0.1804375) * 10) / 10;
        let y = Math.round((_r * 0.2126729 + _g * 0.7151522 + _b * 0.072175) * 10) / 10;
        let z = Math.round((_r * 0.0193339 + _g * 0.119192 + _b * 0.9503041) * 10) / 10;
        
        return [x,y,z]; 
    }

    const XyzToLab = (xyz) => {
        const [x, y, z] = xyz;

        // Коэффициенты для преобразования
        const xn = 95.047;
        const yn = 100.0;
        const zn = 108.883;

        const fx = x / xn;
        const fy = y / yn;
        const fz = z / zn;

        const epsilon = 0.008856;
        const kappa = 903.3;

        const f = (t) => t > epsilon ? Math.pow(t, 1 / 3) : (kappa * t + 16) / 116;

        const L = Math.round((116 * f(fy) - 16) * 10) / 10;
        const a = Math.round(500 * (f(fx) - f(fy)) * 10) / 10;
        const b = Math.round(200 * (f(fy) - f(fz)) * 10) / 10;

        return `${L}, ${a}, ${b}`;
    }

    const checkContrast = (c1, c2) => {
        const sRGBToLinear = (c) => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        };

        const getLuminance = (color) => {
        const rgb = color;
        const r = sRGBToLinear(rgb[0]);
        const g = sRGBToLinear(rgb[1]);
        const b = sRGBToLinear(rgb[2]);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };

        const luminance1 = getLuminance(c1);
        const luminance2 = getLuminance(c2);

        const maxLuminance = Math.max(luminance1, luminance2);
        const minLuminance = Math.min(luminance1, luminance2);

        const contrastRatio = (maxLuminance + 0.05) / (minLuminance + 0.05);
        
        if(Math.round(contrastRatio * 10) / 10 < 4.5) {
            setStyle({color: 'red'})
        } else {
            setStyle({color: 'white'})
        }
        setContrast(Math.round(contrastRatio * 10) / 10);
    }

    const mouseDown = (e) => {
        setMouseState(true)

        
        let pixel = localStorage.getItem('pixel').split(',')
        let rgb = ''
        let XYZ = ''
        let Lab = ''
        let LCH = ''
        let OKLch = ''
        if(pixel[3]) {
            rgb = `${pixel[0]}, ${pixel[1]}, ${pixel[2]}`    
            XYZ = rgbToXyz(pixel[0], pixel[1], pixel[2])
            Lab = XyzToLab(XYZ)
            LCH = 123
            OKLch = 123    
        }  
        

        if(localStorage.getItem('tool') == 'brush' && (localStorage.getItem('control') == "false")) {
            setFirstColor(pixel) 
            setFirstColors({rgb: rgb, XYZ: XYZ, Lab: Lab, LCH: '', OKLch: ''})
            localStorage.setItem('c1', [pixel[0], pixel[1], pixel[2]])
            if (image) {
                context.drawImage(image, 0, 0, image.width, image.height)
            }
            if (secondColor) {
                console.log(`Первый цвет ${pixel}, ${secondColor}`)
                checkContrast(pixel, secondColor)
            }
        } else if(localStorage.getItem('tool') == 'brush' && (localStorage.getItem('control') == "true")) {
            setSecondColor(pixel)
            setSecondColors({rgb: rgb, XYZ: XYZ, Lab: Lab, LCH: '', OKLch: ''})
            localStorage.setItem('c2', [pixel[0], pixel[1], pixel[2]])
            if (image) {
                context.drawImage(image, 0, 0, image.width, image.height)
            }
            if (firstColor) {
                console.log(`Второй цвет ${firstColor}, ${pixel}`)
                
                checkContrast(firstColor, pixel)
            }
        }
    }


    const mouseUp = (e) => {
        setMouseState(false)
    }

    const downHandler = (e) => {
        if(e.key == 'Control') {
            localStorage.setItem('control', "true")
        }
    }

    const upHandler = (e) => {
        if(e.key == 'Control') {
            localStorage.setItem('control', "false")     
        }
    }
    
    const mouseScroll = (e) => {

    }

    const getCanvas = () => {
        const cnv = document.getElementsByClassName('canvas')[0]
        cnv.width = cnv.offsetWidth
        cnv.height = cnv.offsetHeight
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
        setImage(null)
    }

    const fileChange = async (e) => {
        let img = await createImageBitmap(e.target.files[0]).then((resp) => {
            return resp
        })
        setImage(img)
        setUrl(null)
    }

    const createNewFile = (e) => {
        e.preventDefault()

        if(width <= 0 || height <= 0) {
            setMessage('Высота и ширина изображения не могут быть меньше нуля')
        }

        handleFormChange('none')

        canvas.style.width = width + 'px'
        canvas.style.height = height + 'px'
        canvas.width = width
        canvas.height = height

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

    const submitForm = async (e) => {
        e.preventDefault()
        
        if(!image && !url) {
            setMessage('Выберите изображение или вставьте ссылку на него')
            return    
        }
        
        if(image) {
            openImage()
            setMessage('')
            return
        } else if(url) {
            fetchImage()
            setMessage('')
        }
    }



    function createMatrix(arr, width, height) {
        if (arr.length !== width * height * 4) {
            return "Недостаточно элементов в массиве для заполнения матрицы";
        }
        
        let matrix = [];
        let index = 0;
        
        for (let i = 0; i < height; i++) {
            matrix[i] = [];
            for (let j = 0; j < width; j++) {
            matrix[i][j] = [];
            for (let k = 0; k < 4; k++) {
                matrix[i][j][k] = arr[index];
                index++;
            }
            }
        }
        
        return matrix;
        }

    const drawPhoto = (ctx, x1 , y1, x2, y2) => {
        const tempCanvas = document.createElement("canvas"),
        tCtx = tempCanvas.getContext("2d");

        tempCanvas.width = image.width;
        tempCanvas.height = image.height;

        tCtx.drawImage(image, 0, 0, image.width, image.height)

        tempCanvas.toBlob((blob) => {
            setBlob(blob)
        }) 

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, x1, y1, x2, y2)
    }

    const openImage = () => {
        let scale = range / 100
        let NIW = canvas.width * scale
    

        
        let NIH = image.height * ((canvas.width * scale) / image.width)
        setImageWidth(NIW)
        setImageHeight(NIH)
        let currentCoordinates = [canvas.width * ((1 - scale)/2), (canvas.height - NIH)/2]
        setCoordinates(currentCoordinates)

        drawPhoto(context, currentCoordinates[0], currentCoordinates[1], NIW, NIH)

        let matrix = context.getImageData(currentCoordinates[0], currentCoordinates[1], NIW, NIH)
        setImageMatrix(createMatrix(matrix.data, matrix.width, matrix.height))

        canvas.toBlob((blob) => {
            setBlob(blob)
        })
        handleFormChange('none')
    }

    const fetchImage = async () => {
        var RegExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

        if(!RegExp.test(url)){ 
            setMessage('Введите корректную ссылку')
            return
        }
        
        try {
            let response = await fetch(url)
            const blob = await response.blob()
            if(blob.type.split('/')[0] != 'image') {
                setMessage('Введите ссылку на изображение')
                return
            }
            setBlob(blob)
            const fileReader = new FileReader()
            fileReader.readAsDataURL(blob)
            fileReader.onloadend = () => {
                let img = new Image()
                img.src = URL.createObjectURL(blob)

                img.onload = () => {
                    canvas.width = img.width
                    canvas.height = img.height
                    canvas.style.width = img.width + "px"
                    canvas.style.height = img.height + "px"

                    context.drawImage(img, 0, 0)
                }
            }
        } catch(error) {
            console.log(error)
            setMessage('Введите корректную ссылку')
            return
        }
        handleFormChange('none')

    }

    const getCoordinate = (e) => {
        if (image) {
            let pixel = context.getImageData(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 1, 1).data
            if (pixel[3] > 0) { 
                let ratioX = ((e.nativeEvent.offsetX - coorinates[0]) * 100) / imageWidth
                let ratioY = ((e.nativeEvent.offsetY - coorinates[1]) * 100) / imageHeight
                setHoverCoordinates([Math.round((ratioX * image.width) / 100), Math.round((ratioY * image.height) / 100)])
                let rgbColor = `${pixel[0]},${pixel[1]},${pixel[2]}`
                setPixelColor(rgbColor)
            }
            localStorage.setItem('pixel', pixel)
        }

        if (mouseState && localStorage.getItem('tool') == 'hand' && form == 'none' && image) {    
            let CX = coorinates[0]
            if(coorinates[0] > -canvas.width * 0.5 && coorinates[0] < canvas.width * 0.9) {
                CX += e.movementX
            } else {
                CX -= e.movementX * 7
            }

            let CY = coorinates[1]
            if(coorinates[1] > -canvas.height * 0.5 && coorinates[1] < canvas.height * 0.9) {
                CY += e.movementY
            } else {
                CY -= e.movementY * 7
            }

            let currentCoordinates = [CX, CY]

            drawPhoto(context, currentCoordinates[0], currentCoordinates[1], imageWidth, imageHeight)

            setCoordinates(currentCoordinates)
        }

    }

    const resize = () => {
        const tempCanvas = document.createElement("canvas"),
        tCtx = tempCanvas.getContext("2d");

        tempCanvas.width = resizeX;
        tempCanvas.height = resizeY;
        setImageWidth(resizeX)
        setImageHeight(resizeY)

        tCtx.drawImage(image, 0, 0, resizeX, resizeY)
        let newImage = createImageBitmap(tCtx.getImageData(0, 0, resizeX, resizeY))
        newImage.then((rt) => {
            setImage(rt)
        })

        tempCanvas.toBlob((blob) => {
            setBlob(blob)
        }) 
    }

    const rangeChange = (e) => {
        setRange(e.target.value)
        let scale = range / 100
        let NIW = canvas.width * scale
        let NIH = image.height * ((canvas.width * scale) / image.width)
        setImageWidth(NIW)
        setImageHeight(NIH)
        let currentCoordinates = [canvas.width * ((1 - scale)/2), (canvas.height - NIH)/2]
        setCoordinates(currentCoordinates)

        drawPhoto(context, currentCoordinates[0], currentCoordinates[1], NIW, NIH)
    }

    const colorMenuToggler = () => {
        if (colorMenu) {
            setColorMenu(false)
        } else {
            setColorMenu(true)
        }
    }

    const resizeToggler = () => {
        if(resizeMenu == false) {
            setResizeMenu(true)
        } else {
            setResizeMenu(false)
        }
    }

    const curveToggler = () => {
        if(curveMenu == 'hidden') {
            setCurveMenu('visible') 
            drawGraph()
        } else {
            setCurveMenu('hidden')
        }
    }

    const changeResizeCheckbox = () => {
        if(resizeCheckbox) {
            setResizeCheckbox(false)
        } else {
            setResizeCheckbox(true)
        }
    }

    const changePreviewCheckbox = () => {
        if(previewCheckbox) {
            setPreviewCheckbox(false)
        } else {
            setPreviewCheckbox(true)
        }
    }


    const changeResizeX = (e) => {
        setResizeX(e.target.value)
        if(resizeCheckbox) {
            let ratioX = (e.target.value * 100) / image.width
            let newY = (image.height * ratioX) / 100
            setResizeY(Math.round(newY))
        }
        const tempCanvas = document.createElement("canvas"),
        tCtx = tempCanvas.getContext("2d");
    }

    const changeResizeY = (e) => {
        setResizeY(e.target.value)
        if(resizeCheckbox) {
            let ratioY = (e.target.value * 100) / image.height
            let newX = (image.width * ratioY) / 100
            setResizeX(Math.round(newX))
        }        
    }

    const changeCurveX1 = (e) => {

        let value = Number(e.target.value)

        if(value >= curveY1) {
            value = curveY1 - 1
        }

        setCurveX1(value)
        drawCurve(value, curveX2, curveY1, curveY2)
        getHistogram()
    }

    const changeCurveX2 = (e) => {
        let value = Number(e.target.value)



        setCurveX2(value)
        drawCurve(curveX1, value, curveY1, curveY2)
        getHistogram()
    }

    const changeCurveY1 = (e) => {
        let value = Number(e.target.value)


        setCurveY1(value)
        drawCurve(curveX1, curveX2, value, curveY2)  
        getHistogram()  
    }

    const changeCurveY2 = (e) => {
        let value = Number(e.target.value)

        setCurveY2(value)
        drawCurve(curveX1, curveX2, curveY1, value)
        getHistogram()
    }

    const drawGraph = () => {

        const canvas = document.getElementById("curve");
        const ctx = canvas.getContext("2d");

        ctx.strokeStyle = 'white'
        ctx.beginPath();

        ctx.lineWidth = 3;

        ctx.moveTo(0, 0);
        ctx.lineTo(0, 255); 
        ctx.moveTo(0, 255);
        ctx.lineTo(255, 255); 

        ctx.stroke();

        ctx.lineWidth = 1
        ctx.strokeStyle = 'gray'

        ctx.moveTo(255 * (1/3), 0)
        ctx.lineTo(255 * (1/3), 255)
        ctx.moveTo(255 * (2/3), 0)
        ctx.lineTo(255 * (2/3), 255)

        ctx.moveTo(0, 255 * (1/3))
        ctx.lineTo(255, 255 * (1/3))
        ctx.moveTo(0, 255 * (2/3))
        ctx.lineTo(255, 255 * (2/3))

        ctx.stroke();
        ctx.closePath()

        let R = new Array(256).fill(0);
        let G = new Array(256).fill(0);
        let B = new Array(256).fill(0);
        
        let imageData = context.getImageData(coorinates[0], coorinates[1], imageWidth+1, imageHeight+1);
        let data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            let red = data[i];
            let green = data[i + 1];
            let blue = data[i + 2];
            R[red]++;
            G[green]++;
            B[blue]++;
        }

        

        R = normolize(R)
        G = normolize(G)
        B = normolize(B)

        // console.log(`${R}, ${G}, ${B}`)
        ctx.beginPath()
        ctx.moveTo(0,255)
        ctx.strokeStyle = 'red'
        for(let i = 0; i < 255; i++) {
            ctx.lineTo(i, 255 - R[i])
        }
        ctx.stroke();
        ctx.closePath()

        ctx.beginPath()
        ctx.moveTo(0,255)
        ctx.strokeStyle = 'green'
        for(let i = 0; i < 255; i++) {
            ctx.lineTo(i, 255 - G[i])
        }
        ctx.stroke();
        ctx.closePath()

        ctx.beginPath()
        ctx.moveTo(0,255)
        ctx.strokeStyle = 'blue'
        for(let i = 0; i < 255; i++) {
            ctx.lineTo(i, 255 - B[i])
        }
        ctx.stroke();
        ctx.closePath()

    }

    const normolize = (histogram) => {
        const max = Math.max(...histogram);
        let yahzkaketonazvat = ((max / 255) * 100) / max
        return histogram.map((value) => ((value * yahzkaketonazvat) / 100).toFixed(1));
    }

    const drawCurve = (x1, x2, y1, y2) => {
        const canvas = document.getElementById("curve");
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, 255, 255)

        drawGraph()

        ctx.strokeStyle = 'white'
        ctx.beginPath();

        ctx.moveTo(0, 255 - x2)
        ctx.lineTo(x1, 255 - x2)
        ctx.lineTo(y1, 255 - y2)
        ctx.lineTo(255, 255 - y2)

        ctx.stroke()
        
    }



    const getHistogram = () => {
        if(previewCheckbox) {
            drawPhoto(context, coorinates[0], coorinates[1], imageWidth, imageHeight)
            let lut = [];
            for (let i = 0; i < curveX1; i++) {
                lut[i] = curveX2;
            }
            for (let i = curveX1; i < curveY1; i++) {
                const slope = (curveY2 - curveX2) / (curveY1 - curveX1);
                let correctedValue = curveX2 + slope * (i - curveX1);
                correctedValue = Math.max(0, Math.min(255, correctedValue));
                lut[i] = correctedValue;
            }
            for (let i = curveY1; i < 256; i++) {
                lut[i] = curveY2;
            }

            let imageData = context.getImageData(coorinates[0], coorinates[1], imageWidth+1, imageHeight+1);
            let data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                data[i] = lut[data[i]];
                data[i + 1] = lut[data[i + 1]];
                data[i + 2] = lut[data[i + 2]];
            }

            context.putImageData(imageData, coorinates[0], coorinates[1]);
        }
    } 

    const resetCurve = () => {
        setCurveX1(0)
        setCurveX2(0)
        setCurveY1(255)
        setCurveY2(255)

        getHistogram()
        drawGraph()
        drawCurve(0,0,255,255)
    }

    const confirmCurve = () => {
        const tempCanvas = document.createElement("canvas"),
        tCtx = tempCanvas.getContext("2d");

        tempCanvas.width = image.width;
        tempCanvas.height = image.height;

        let newImage = createImageBitmap(context.getImageData(coorinates[0], coorinates[1], imageWidth, imageHeight))
        newImage.then((rt) => {
            setImage(rt)
            tCtx.drawImage(rt, 0, 0, imageHeight, imageWidth)
            tempCanvas.toBlob((blob) => {
                setBlob(blob)
            }) 
        })
    }

    const confirmFilter = () => {
        const tempCanvas = document.createElement("canvas"),
        tCtx = tempCanvas.getContext("2d");

        tempCanvas.width = image.width;
        tempCanvas.height = image.height;

        let newImage = createImageBitmap(context.getImageData(coorinates[0], coorinates[1], imageWidth, imageHeight))
        newImage.then((rt) => {
            setImage(rt)
            tCtx.drawImage(rt, 0, 0, imageHeight, imageWidth)
            tempCanvas.toBlob((blob) => {
                setBlob(blob)
            }) 
        })
    }

    const filter = (kernel) => {
        drawPhoto(context, coorinates[0], coorinates[1], imageWidth, imageHeight)

        const imageData = context.getImageData(coorinates[0], coorinates[1], imageWidth, imageHeight)
        const newData = new Uint8ClampedArray(imageData.data.length);

        const paddedData = padImageData(
            imageData.data,
            imageData.width,
            imageData.height
        );

        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                for (let c = 0; c < 4; c++) {
                const outputIndex = (y * imageData.width + x) * 4 + c;
                let sum = 0;
                let kernelSum = 0;
                for (let ky = 0; ky < 3; ky++) {
                    for (let kx = 0; kx < 3; kx++) {
                    const inputIndex =
                        ((y + ky) * (imageData.width + 2) + (x + kx)) * 4 + c;
                    sum += paddedData[inputIndex] * kernel[ky][kx];
                    kernelSum += kernel[ky][kx];
                    }
                }
                newData[outputIndex] = sum / kernelSum;
                }
            }
        }

        imageData.data.set(newData);
        context.putImageData(imageData, coorinates[0], coorinates[1])
    }

    const padImageData = (data, width, height) => {
        const paddedWidth = width + 2;
        const paddedHeight = height + 2;
        const paddedData = new Uint8ClampedArray(paddedWidth * paddedHeight * 4);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
            const inputIndex = (y * width + x) * 4;
            const outputIndex = ((y + 1) * paddedWidth + x + 1) * 4;
            paddedData.set(
                data.subarray(inputIndex, inputIndex + 4),
                outputIndex
            );
            }
        }

        for (let y = 0; y < paddedHeight; y++) {
            for (let x = 0; x < paddedWidth; x++) {
            const outputIndex = (y * paddedWidth + x) * 4;
            if (
                x === 0 ||
                x === paddedWidth - 1 ||
                y === 0 ||
                y === paddedHeight - 1
            ) {
                const nearestX = Math.max(1, Math.min(x, paddedWidth - 2));
                const nearestY = Math.max(1, Math.min(y, paddedHeight - 2));
                const nearestIndex = (nearestY * paddedWidth + nearestX) * 4;
                paddedData.set(
                paddedData.subarray(nearestIndex, nearestIndex + 4),
                outputIndex
                );
            }
            }
        }
        return paddedData;
    }

    const changeFilterCheckbox = () => {
        if (filterCheckbox) {
            setFilterCheckbox(false)
        } else {
            setFilterCheckbox(true)
        }
    }

    const filterMenuToggler = () => {
        if (filterMenu == 'visible') {
            setFiletMenu('hidden')
        } else {
            setFiletMenu('visible')
        }
    }

    const filterReset = () => {
        setKernel([[0,0,0],[0,1,0],[0,0,0]])
        setK1(0)
        setK2(0)
        setK3(0)
        setK4(0)
        setK5(1)
        setK6(0)
        setK7(0)
        setK8(0)
        setK9(0)
    }

    const filterTypeChange = (e) => {
        setFilterType(e.target.value)
        if (e.target.value == 'same') {
            setKernel(
                [
                    [0, 0, 0],
                    [0, 1, 0],
                    [0, 0, 0],
                ]
            )
            setK1(0)
            setK2(0)
            setK3(0)
            setK4(0)
            setK5(1)
            setK6(0)
            setK7(0)
            setK8(0)
            setK9(0)
            filter([
                    [0, 0, 0],
                    [0, 1, 0],
                    [0, 0, 0],
                ])
        } else if (e.target.value == "sharp") {
            setKernel(
                [
                    [-1, -1, -1],
                    [-1, 9, -1],
                    [-1, -1, -1],
                ]
            )
            setK1(-1)
            setK2(-1)
            setK3(-1)
            setK4(-1)
            setK5(9)
            setK6(-1)
            setK7(-1)
            setK8(-1)
            setK9(-1)
            filter(
                [
                    [-1, -1, -1],
                    [-1, 9, -1],
                    [-1, -1, -1],
                ]
            )
        } else if (e.target.value == "gaus") {
            setKernel(
                [
                    [1, 2, 1],
                    [2, 4, 2],
                    [1, 2, 1],
                ]
            )
            setK1(1)
            setK2(2)
            setK3(1)
            setK4(2)
            setK5(4)
            setK6(2)
            setK7(1)
            setK8(2)
            setK9(1)
            filter(
                [
                    [1, 2, 1],
                    [2, 4, 2],
                    [1, 2, 1],
                ]
            )
        } else if (e.target.value == "rect") {
            setKernel(
                [
                    [1, 1, 1],
                    [1, 1, 1],
                    [1, 1, 1],
                ]
            )
            setK1(1)
            setK2(1)
            setK3(1)
            setK4(1)
            setK5(1)
            setK6(1)
            setK7(1)
            setK8(1)
            setK9(1)
            filter(
                [
                    [1, 1, 1],
                    [1, 1, 1],
                    [1, 1, 1],
                ]
            )
        }
    }


    useEffect(() => {
        getCanvas()
        let workspace = document.getElementsByClassName('workspace')[0]
        workspace.onmousedown = mouseDown
        workspace.onmouseup = mouseUp
        workspace.onwheel = mouseScroll
        window.addEventListener('keydown', downHandler)
        window.addEventListener('keyup', upHandler)
        if(image) {
            drawPhoto(context, coorinates[0], coorinates[1], imageWidth, imageHeight)
        }

        
    }, [canvas, firstColor, secondColor, contrast])  

    
    return (
        <div className='workspace'> 
            <canvas onMouseMove={getCoordinate} className='canvas'/>
            <UploadForm form={form} handleFormChange={handleFormChange} createNewFile={createNewFile} submitForm={submitForm} widthChange={widthChange} heightChange={heightChange} urlChange={urlChange} fileChange={fileChange} message={message}/>
            <div className='workspace__coordinates'>
                { !image &&
                <div className='bottom-menu-buttons'>
                    <button disabled onClick={saveFile}>Save</button>
                    <button disabled className='resize'>Resize</button>
                    <button disabled>Color</button>
                    <button disabled>Curve</button>
                    <button disabled>Filters</button>
                    <input disabled type='range' min="12" max="300" value={range} onChange={rangeChange} id='range' ></input>
                </div>
                }
                { image &&
                    <div className='bottom-menu-buttons'>
                        <button onClick={saveFile}>Save</button>
                        <button className='resize' onClick={resizeToggler}>Resize</button>
                        <button onClick={colorMenuToggler}>Color</button>
                        <button onClick={curveToggler}>Curve</button>
                        <button onClick={filterMenuToggler}>Filters</button>
                        <input type='range' min="12" max="300" step='5' value={range} onChange={rangeChange} id='range' ></input>
                    </div>
                }
                <p className='workspace__coordinate'>{range} %</p>
                <p className='workspace__coordinate'>X: {hoverCoordinates[0]}</p>
                <p className='workspace__coordinate'>Y: {hoverCoordinates[1]}</p>
                <div className='workspace__pixel-color' style={{background: `rgb(${pixelColor})`}}></div>   
                <p className='workspace__coordinate'>rgb: {pixelColor}</p>
            </div>

                {resizeMenu &&
                <div className='menu'>

                    <div className='text-pair'>
                        <p>Ширина: {Math.round(image.width)}</p>
                        <p>Высота: {Math.round(image.height)}</p>
                        <input value={resizeX} onChange={changeResizeX} placeholder='Ширина'></input>
                        <input value={resizeY} onChange={changeResizeY} placeholder='Высота'></input>
                        <input checked={resizeCheckbox} onClick={changeResizeCheckbox} type='checkbox'></input>
                        <label>Сохранить пропорцию</label>
                        <button onClick={resize}>Изменить размер</button>
                    </div>
                </div>
                }
                {colorMenu &&
                <div className='menu'>
                    <div className='text-pair'>
                        <div className='workspace__pixel-color' style={{background: `rgba(${firstColor})`}}></div>
                        <div className='workspace__pixel-color' style={{background: `rgb(${secondColor})`}}></div>
                        {firstColor[0]}
                    </div>
                    <div className='text-pair'>
                        <p id='firstcolor'>
                            rgb: {firstColors.rgb}
                        </p>
                        <p id='secondcolor'>
                            rgb: {secondColors.rgb}
                        </p>
                    </div>
                    <div className='text-pair'>
                        <p>
                            XYZ: {`${firstColors.XYZ[0]}, ${firstColors.XYZ[1]}, ${firstColors.XYZ[2]}`}
                        </p>
                        <p>
                            XYZ: {`${secondColors.XYZ[0]}, ${secondColors.XYZ[1]}, ${secondColors.XYZ[2]}`}
                        </p>
                    </div>
                    <div className='text-pair'>
                        <p>
                            Lab: {firstColors.Lab}
                        </p>
                        <p>
                            Lab: {secondColors.Lab}
                        </p>
                    </div>
                    <p style={style}>
                    Контраст: {contrast}
                    </p>
                </div>
                }

                    <div id='curvemenu' className='menu' style={{'visibility': curveMenu}}>
                        <div className='curve'>
                            <p>255</p>
                            <div className='curve-canvas__wrapper'>
                                <canvas id='curve' width='255' height='255'></canvas>
                            </div>
                            <div className='curve__pair'>
                                <p>0</p>
                                <p>255</p>
                            </div>
                            <div className='curve__pair'>
                                <div className='curve__column'>
                                    <label class="modal__label">
                                    X1:
                                    <input value={curveX1} onChange={changeCurveX1} type="number" min="0" max={curveY1 - 1} step={5}/>
                                    </label>   
                                    <label class="modal__label">
                                    Y1:
                                    <input value={curveY1} onChange={changeCurveY1} type="number" min={curveX1 + 1} max="255" step={5}/>
                                    </label>
                                </div>
                                <div className='curve__column'>
                                    <label class="modal__label">
                                    X2:
                                    <input value={curveX2} onChange={changeCurveX2} type="number" min="0" max={curveY2 - 1} step={5}/>
                                    </label>   
                                    <label class="modal__label">
                                    Y2:
                                    <input value={curveY2} onChange={changeCurveY2} type="number" min={curveX2 + 1} max="255" step={5}/>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <input checked={previewCheckbox} onClick={changePreviewCheckbox} type='checkbox'></input>
                                <label>Предпросмотр</label>
                            </div>
                            <button onClick={confirmCurve}>Подтвердить</button>
                            <button onClick={resetCurve}>Отмена</button>
                        </div>
                    </div>

                    <div id='filtermenu' className='menu' style={{'visibility': filterMenu}}>
                        <div className='matrix'>
                            <div className='matrix__line'>
                                <input type='number' id='k1' className='matrix__input' onChange={changeK1} value={k1}></input>
                                <input type='number' id='k2' className='matrix__input' onChange={changeK2} value={k2}></input>
                                <input type='number' id='k3' className='matrix__input' onChange={changeK3} value={k3}></input>
                            </div>
                            <div className='matrix__line'>
                                <input type='number' id='k4' className='matrix__input' onChange={changeK4} value={k4}></input>
                                <input type='number' id='k5' className='matrix__input' onChange={changeK5} value={k5}></input>
                                <input type='number' id='k6' className='matrix__input' onChange={changeK6} value={k6}></input>
                            </div>
                            <div className='matrix__line'>
                                <input type='number' id='k7' className='matrix__input' onChange={changeK7} value={k7}></input>
                                <input type='number' id='k8' className='matrix__input' onChange={changeK8} value={k8}></input>
                                <input type='number' id='k9' className='matrix__input' onChange={changeK9} value={k9}></input>
                            </div>
                        </div>
                        <div>
                            <input checked={filterCheckbox} onClick={changeFilterCheckbox} type='checkbox'></input>
                            <label>Предпросмотр</label>
                        </div>
                        <select name="select" onChange={filterTypeChange}>
                            <option value="same" selected>Тождественное</option>
                            <option value="sharp" selected>Резкость</option>
                            <option value="gaus">Размытие по Гауссу</option>
                            <option value="rect">Прямоугольное размытие</option>
                        </select>
                        <button onClick={confirmFilter}>Применить</button>
                        <button onClick={filterReset}>Отмена</button>
                    </div>

            
        </div>
    )
}

export default forwardRef(WorkSpace) 