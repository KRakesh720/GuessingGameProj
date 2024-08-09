import React, { useState } from "react";
import './App.css';

export default function HomePage() {
    const [button, setButton] = useState(true);
    const [gamestart, setGamestart] = useState(false);
    const [generatedNumber, setGeneratedNumber] = useState('');
    const [guess, setGuess] = useState('');
    const [feedback, setFeedback] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [userName, setUserName] = useState('');

    const startGame = () => {
        const name = prompt("Please enter your name");
        if (!name) {
            alert("Name cannot be empty. Please enter your name.");
            return;
        }

        setUserName(name);
        console.log(`User Name: ${name}`);
        setGamestart(true);
        setButton(false);
        setFeedback('');
        setAttempts(0);
        setGuess('');

        let numArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let num = '';

        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * numArray.length);
            num += numArray[randomIndex];
            numArray.splice(randomIndex, 1); // Remove the used digit from the array
        }

        setGeneratedNumber(num);
        console.log(`Generated number: ${num}`);
    };

    const handleInputChange = (e) => {
        setGuess(e.target.value);
    };

    const checkGuess = () => {
        if (guess.length !== 4) {
            alert("Please enter a 4-digit number");
            return;
        }

        setAttempts(attempts + 1);
        let result = '';

        for (let i = 0; i < 4; i++) {
            if (guess[i] === generatedNumber[i]) {
                result += '+';
            } else if (generatedNumber.includes(guess[i])) {
                result += '-';
            }
        }

        setFeedback(result);

        if (result === '++++') {
            alert(`Congratulations, ${userName}! You guessed the number in ${attempts + 1} attempts.`);
            resetGame();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            checkGuess();
        }
    };

    const resetGame = () => {
        setGamestart(false);
        setButton(true);
        setGeneratedNumber('');
        setAttempts(0);
        setFeedback('');
        setGuess('');
    };

    return (
        <>
            <div id="container">
                {button && (
                    <button className="button" onClick={startGame}>Start a new game</button>
                )}
                {gamestart && (
                    <div className="c1">
                        <input 
                            id="userinput" 
                            type="number" 
                            value={guess} 
                            onChange={handleInputChange} 
                            onKeyPress={handleKeyPress}
                            placeholder="Enter the four digits number" 
                        />
                        <div className="feedback">
                            {feedback && <p>Feedback: {feedback}</p>}
                            <p>Attempts: {attempts}</p>
                        </div>
                        <button onClick={resetGame}>Start a New Game</button>
                    </div>
                )}
            </div>
        </>
    );
}
 
