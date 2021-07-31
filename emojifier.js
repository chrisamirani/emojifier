const MODEL_URL = "/models"
const body = document.querySelector("body")
async function emojify(yourImage){
    let top,left,height = 0
    let emojis = ["emoji"]
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)

    
    const detections = await faceapi.detectAllFaces(yourImage)
    
    for(face in detections){
        top = detections[face]._box._y
        left = detections[face]._box._x
        height = detections[face]._box._height
        let emoji = `<img src="./emojis/${emojis}.png" style="position: absolute;height: ${height}px;left: ${left}px;top: ${top}px;">`
        body.innerHTML += emoji
    }
}
