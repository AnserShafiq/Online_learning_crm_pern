import { useState } from "react"
import { ArrowLeft, ArrowRight}from 'lucide-react'
const Sections = [
    {
        h1Head: 'Lecture on The Private Security and Investigative Services Act (PSISA)',
        h3Head: 'Introduction to Security',
        body: 'This lecture aims to prepare students for the Ontario Ministry of Community Safety and Correctional Services Exam, covering the fundamental aspects of private security and investigative services under the PSISA.',
    },
    {
        h1Head: 'History of the PSISA',
        body: 'The Private Security and Investigative Services Act (PSISA) was introduced to regulate the private security industry in Ontario. It replaced the Private Investigators & Security Guards Act, which lacked standardized training and competency requirements.',
        h3Head: 'Key Events Leading to PSISA:',
        points: [
            'In 1966, there were approximately 4,000 licensed security guards, with no formal training requirements.',
            'The Patrick Shand Inquest in 2004 highlighted the necessity for security guard training and regulation.',
            'Following this inquiry, 22 recommendations were made, leading to the establishment of the PSISA.',
            'The act now defines licensing, training, and uniform regulations for security guards in Ontario.',
        ],
    }
]


const SectionOne = () => {
    return( 
        <div className="flex flex-col justify-start items-start w-full">
            <h1>{Sections[0].h1Head}</h1>
            <h3>{Sections[0].h3Head}</h3>
            <p>{Sections[0].body}</p>
        </div>
    )
}
const SectionTwo = () => {
    return( 
        <div className="flex flex-col justify-start items-start w-full">
            <h1>{Sections[1].h1Head}</h1>
            <p>{Sections[1].body}</p>
            <h3>{Sections[1].h3Head}</h3>
            <ul className="list-disc pl-5 mt-2">
                {
                    Sections[1].points.map((point, index) => 
                        <li key={index}>{point}</li>
                    )
                }
            </ul>
        </div>
    )
}


export default function LectureOne() {
    const [index, setIndex] = useState(0)
    const Steps = [
        <SectionOne key="section-one" />,
        <SectionTwo key="section-two" />,
    ]

    const decreaseIndex = () => {
        setIndex(prevIndex => (prevIndex === 0 ? Steps.length - 1 : prevIndex - 1));
    };

    const increaseIndex = () => {
        setIndex(prevIndex => (prevIndex === Steps.length - 1 ? 0 : prevIndex + 1));
    };
    return(
        <div className="relative w-full p-14 h-[700px] max-h-[700px] border">
            <h5>{index}</h5>
            
            <div className=" h-[700px] max-h-[500px] w-full">
                {Steps[index]}
            </div>
            <div className="absolute bottom-0 left-0 px-14 flex flex-row w-full justify-between ">
                <button className="text-md inline-flex gap-1 items-center justify-center border-b-2 py-[0.75px] border-emerald-700 hover:border-gray-300 text-emerald-600 hover:text-gray-300 transition-transform ease-in-out duration-600" onClick={decreaseIndex}> <ArrowLeft className="h-5"/> Prev</button>
                <button className="text-md inline-flex gap-1 items-center justify-center border-b-2 py-[0.75px] border-emerald-700 hover:border-gray-300 text-emerald-600 hover:text-gray-300 transition-transform ease-in-out duration-600" onClick={increaseIndex}> Next<ArrowRight className="h-5"/></button>
            </div>
        </div>
    )
}