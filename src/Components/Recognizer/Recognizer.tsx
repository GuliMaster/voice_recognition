import React from 'react';
import s from './Recognizer.module.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Recognizer = () => {
    interface Speech {
        transcript: string,
        listening: boolean,
        resetTranscript: ()=>void,
        browserSupportsSpeechRecognition: boolean
    }

    const speech:Speech = useSpeechRecognition();

    if (!speech.browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const startHandler = (event: React.MouseEvent<HTMLButtonElement>):void => {
        SpeechRecognition.startListening();
    }
    const stopHandler = (event: React.MouseEvent<HTMLButtonElement>):void => {
        SpeechRecognition.stopListening();
    }
    const resetHandler = (event: React.MouseEvent<HTMLButtonElement>):void => {
        speech.resetTranscript();
    }

    const addNumberToWord = (text: string):string => {
        return text?text.split(' ').map(word => word+Math.floor(Math.random()*100)).join(' '):'';
    }

    return (
        <div className={s.container}>
            <div className={s.recognizer}>
                <p className={s.mic}>Микрофон: {speech.listening ? 'включен' : 'выключен'}</p>
                <div className={s.buttons}>
                    <button className={s.button} onClick={startHandler}>Старт</button>
                    <button className={s.button} onClick={stopHandler}>Стоп</button>
                    <button className={s.button} onClick={resetHandler}>Обновить</button>
                </div>
                <p className={s.speech}>{addNumberToWord(speech.transcript)}</p>
            </div>
        </div>
    );
}

export default Recognizer;