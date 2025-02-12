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



    return(
        <>
        <div>
            <h1>Rock Paper Scissors</h1>
            <div>
                {choices.map((choice) => (
                    <button key={choice} onClick={() => handleChoice(choice)}>
                        {choice}
                    </button>
                ))}
            </div>
            {result && (
                <div>
                    <h2>{result.result}</h2>
                    <p>Player: {result.playerChoice}</p>
                    <p>Computer: {result.computerChoice}</p>
                    
                    <button onClick={resetGame}>Play Again</button>
                    {showPrize && (
                        <button onClick={claimPrize}>Claim Prize</button>
                    )}
                </div>
            )}
            {showModal && (
                <div>
                    <h2>Prize Claimed</h2>
                    <button onClick={resetGame}>Close</button>
                </div>
            )}
</div>
        </>
    )

}