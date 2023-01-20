var mydata = {
    "scenes": {
        "scene0": {
            "id": "0",
            "message": "Scene 0 中文 line 1\n Scene 0 中文 line 2",
            "buttons": [
                {
                    "text": "轉去 1 \n line2",
                    "target": "1"
                }
            ]
        },
        "scene1": {
            "id": "1",
            "message": "Scene 1 中文",
            "buttons": [
                {
                    "text": "轉去 0",
                    "target": "0"
                },
                {
                    "text": "轉去 2",
                    "target": "2"
                }
            ]
        },
        "scene2": {
            "id": "2",
            "message": "Scene 2 中文",
            "buttons": [
                {
                    "text": "轉去 0",
                    "target": "0"
                }
            ]
        }
    }
}
const findsceneById = (id_t) => {
    const key = Object.keys(mydata.scenes).find(scene => mydata.scenes[scene].id === id_t)
    return mydata.scenes[key]
}