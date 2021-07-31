const MODEL_URL = "/models"
const body = document.querySelector("body")
async function emojify(imageID) {
    let img = document.querySelector(imageID)
    let top, left, height = 0
    let emojis = ['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised']
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)


    const detections = await faceapi.detectAllFaces(img).withFaceExpressions()

    for (face in detections) {
        top = detections[face].detection._box._y
        left = detections[face].detection._box._x
        height = detections[face].detection._box._height
        let emojiPic = "happy"


        for (expr in emojis) {
            if (detections[face].expressions[emojis[expr]] > 0.8) {
                emojiPic = emojis[expr]
            }
        }
        let emoji = `<img src="./emojis/${emojiPic}.png" style="position: absolute;height: ${height}px;left: ${left}px;top: ${top}px;">`
        body.innerHTML += emoji
    }
}
