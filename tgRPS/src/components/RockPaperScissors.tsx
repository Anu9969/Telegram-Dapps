import {useState} from 'react';
import { Hand, Scroll, Scissors } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Hand, Scroll, Scissors } from "lucide-react";



type choice = "rock" | "paper" |"scissors";
type result = "win" | "lose" | "draw";

const choices: choice[] = ['rock' ,'paper' ,'scissors'];

const getComputerChoice = (): choice => {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}
const getGameResult = (playerChoice: choice, computerChoice: choice): result =>{
    if(playerChoice === computerChoice) return 'draw';
    if(playerChoice === 'rock' && computerChoice === 'scissors') return 'win';
    if(playerChoice === 'paper' && computerChoice === 'rock') return 'win';
    if(playerChoice === 'scissors' && computerChoice === 'paper') return 'win';
    return 'lose';
}

interface GameResult{
    playerChoice: choice;
    computerChoice: choice;
    result: result;
}

export default function RockPaperScissors(){
    const [result, setResult] = useState<GameResult | null>(null);
    const [showPrize, setShowPrize] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [prizeClaimed, setPrizeClaimed] = useState<boolean>(false);

    const handleChoice = (playerChoice: choice) => {
            const computerChoice = getComputerChoice();
            const gameResult = getGameResult(playerChoice, computerChoice);
            setResult({playerChoice, computerChoice, result: gameResult});
            console.log(playerChoice, computerChoice);
            setShowPrize(gameResult === "win" && !prizeClaimed);
        };

    const resetGame =() => {
        setResult(null);
        setShowPrize(false);
        setPrizeClaimed(false);
        

    };

    const claimPrize =() => {
        setShowModal(true);
    };



 


return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Rock Paper Scissors
                </h1>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
                {choices.map((choice) => (
                    <button
                        key={choice}
                        onClick={() => handleChoice(choice)}
                        className="flex items-center justify-center gap-2 h-16 text-lg 
                                 border-2 border-gray-200 rounded-lg px-4 py-2
                                 hover:bg-gray-50 transition-colors duration-200
                                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {choice === 'rock' && <Hand className="w-6 h-6" />}
                        {choice === 'paper' && <Scroll className="w-6 h-6" />}
                        {choice === 'scissors' && <Scissors className="w-6 h-6" />}
                        {choice}
                    </button>
                ))}
            </div>

            {result && (
                <div className="space-y-4">
                    <div className={`text-center p-4 rounded-lg ${
                        result.result === 'You Win!' ? 'bg-green-100 text-green-800' :
                        result.result === 'You Lose!' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                    }`}>
                        <h2 className="text-2xl font-bold mb-2">{result.result}</h2>
                        <div className="flex justify-center gap-8 text-gray-700">
                            <p>You: {result.playerChoice}</p>
                            <p>Computer: {result.computerChoice}</p>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button 
                            onClick={resetGame}
                            className="px-4 py-2 border-2 border-gray-200 rounded-lg
                                     hover:bg-gray-50 transition-colors duration-200
                                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Play Again
                        </button>
                        {showPrize && (
                            <button 
                                onClick={claimPrize}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg
                                         hover:bg-blue-600 transition-colors duration-200
                                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Claim Prize
                            </button>
                        )}
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-6 max-w-sm w-full">
                        <h2 className="text-2xl font-bold text-center mb-4">
                            🎉 Prize Claimed! 🎉
                        </h2>
                        <div className="flex justify-center">
                            <button 
                                onClick={resetGame}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg
                                         hover:bg-blue-600 transition-colors duration-200
                                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
);
    

}