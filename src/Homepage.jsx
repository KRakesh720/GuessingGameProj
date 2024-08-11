import React, { useState } from "react";
import './App.css';
import { addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from './firebase';

export default function HomePage() {
    const [button, setButton] = useState(true);
    const [gamestart, setGamestart] = useState(false);
    const [generatedNumber, setGeneratedNumber] = useState('');
    const [guess, setGuess] = useState('');
    const [feedback, setFeedback] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [userName, setUserName] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const startGame = () => {
        setShowResults(false)
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
            numArray.splice(randomIndex, 1);
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
            saveResult();
            resetGame();
        }
    };

    const saveResult = async () => {
        try {
            await addDoc(collection(firestore, "gameResults"), {
                userName,
                attempts,
                timestamp: new Date(),
            });
            console.log("Game result saved successfully!");
        } catch (error) {
            console.error("Error saving game result: ", error);
        }
    };

    const fetchResults = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "gameResults"));
            const resultsData = [];
            querySnapshot.forEach((doc) => {
                resultsData.push(doc.data());
            });
            setResults(resultsData);
            setShowResults(true);
        } catch (error) {
            console.error("Error fetching game results: ", error);
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
                    <>
                        <button className="button" onClick={startGame}>Start a new game</button>
                        <button onClick={fetchResults}>Display Results</button>
                    </>
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
                {showResults && (
                    <div className="results">
                        <h2>Previous Game Results</h2>
                        {results.length > 0 ? (
                            <ul>
                                {results.map((result, index) => (
                                    <li key={index}>
                                        <strong>Name:</strong> {result.userName}, <strong>Attempts:</strong> {result.attempts}, <strong>Date:</strong> {new Date(result.timestamp.seconds * 1000).toLocaleString()}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No game results found.</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
