import { useState } from "react"
import { ArrowLeft, ArrowRight}from 'lucide-react'
import { Styles } from "../../assets/commonCss"
import { ArrowBigRightDash } from "lucide-react"
import { useUserStore } from "../../stores/useUserStore"
const Sections = [
    {
        h1Head: 'Lecture on The Private Security and Investigative Services Act (PSISA)',
        h3Head: 'Introduction to Security',
        body: 'This lecture aims to prepare students for the Ontario Ministry of Community Safety and Correctional Services Exam, covering the fundamental aspects of private security and investigative services under the PSISA.',
        img: {
            src: '/assets/nass-01.jpg',
            alt: 'North American Security Services'
        }
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
    }, 
    {
        quizHead: 'Quiz on HTML/CSS',
        questions: [
            {
                q: 'Which HTML tag is used to create a hyperlink?',
                options: ['<link>', '<a>', '<href>', '<url>'],
                a: '<a>',
            },
            {
                q: 'Which property is used in CSS to change the text color?',
                options: ['font-color', 'text-color', 'color', 'background-color'],
                a: 'color',
            },
            {
                q: 'Which HTML attribute is used to define inline styles?',
                options: ['style', 'styles', 'class', 'font'],
                a: 'style',
            },
            {
                q: 'What is the correct syntax for adding a background color in CSS?',
                options: ['background-color: blue;', 'color-background: blue;', 'bg-color: blue;', 'background:color blue;'],
                a: 'background-color: blue;',
            },
            {
                q: 'Which CSS property controls the space between elements?',
                options: ['margin', 'padding', 'spacing', 'border'],
                a: 'margin',
            },
        ]
    },    
]

const Quiz = () => {
    const [answers, setAnswers ] = useState([])
    const [marks, setMarks] = useState(0)
    const {setTestResult} = useUserStore()
    const handleSelection = (questionNo, selection )=> {
        // console.log('Q#', questionNo, ' => ', selection)
        setAnswers({
            ...answers,
            [questionNo]: selection,
        })
    }
    const handleCompletion = () => {
        // console.log('Test completed',Sections[2]?.questions.length, answers)
        let correct = 0;
        for(let i=0; i<Sections[2]?.questions.length;i++){
            // console.log(answers[i],' === ', Sections[2].questions[i].a)
            if(answers[i] === Sections[2].questions[i].a){
                // console.log(answers[i] === Sections[2].questions[i].a)
                correct=correct+1
            }
        }
        setTestResult(correct, 1)
        setMarks(correct)
    }
    return (
        <div className={`${Styles.bookContentSection}`}>
            <h1 className={`${Styles.mainHead} text-emerald-500`}>
                {Sections[2].quizHead}
            </h1>
            {
                Object.values(Sections[2].questions).map((Q, index) => (
                    <div key={index} className="flex flex-col w-full mb-3">
                        <h3 className={`${Styles.quizQuestions} text-gray-200`}>
                            {index+1}. {Q.q}
                        </h3>
                        <ul className="grid grid-cols-4 w-full">
                            {Q.options.map((option, i) => (
                                <li key={i} className="text-gray-300 flex items-center">
                                    <input type="radio" name={`question-${index}`} id={`q${index}-opt${i}`} value={option} onChange={() => handleSelection(index, option)} />
                                    <label htmlFor={`q${index}-opt${i}`} className="ml-2">
                                        {option}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            }
            <button onClick={handleCompletion}>Done</button>
            {
                marks && 
                    <h2>Marks Obtained: {marks}</h2>
                
            }
        </div>
    )
}


const SectionOne = () => {
    return( 
        <div className={`${Styles.bookContentSection} `}>
            <h1 className={`${Styles.mainHead} text-emerald-500`}>{Sections[0].h1Head}</h1>
            <h3 className={`${Styles.subHead1} text-gray-200`}>{Sections[0].h3Head}</h3>
            <p className={`${Styles.lectureContent} text-gray-200`}>{Sections[0].body}</p>
            <img  
            className="object-contain w-[94%] h-[400px] object-cover object-top rounded-2xl shadow-lg shadow-gray-800"
            src={Sections[0].img.src} 
            alt={Sections[0].img.alt}/> 
        </div>
    )
}
const SectionTwo = () => {
    return( 
        <div className={`${Styles.bookContentSection}`}>
            <h1 className={`${Styles.mainHead} text-emerald-500`}>{Sections[1].h1Head}</h1>
            <p className={`${Styles.lectureContent} text-gray-200`}>{Sections[1].body}</p>
            <h3 className={`${Styles.subHead1} text-gray-200`}>{Sections[1].h3Head}</h3>
            <div className="mt-2 flex flex-col gap-2">
                {
                    Sections[1].points.map((point, index) => 
                        <h5 className="flex items-center" key={index}><ArrowBigRightDash className="h-5 mr-3"/>{point}</h5>
                    )
                }
            </div>
        </div>
    )
}


export default function LectureOne() {
    const [index, setIndex] = useState(0)
    const Steps = [
        <SectionOne key="section-one" />,
        <SectionTwo key="section-two" />,
        <Quiz key='quiz-one' />
    ]

    const decreaseIndex = () => {
        setIndex(prevIndex => (prevIndex === 0 ? Steps.length - 1 : prevIndex - 1));
    };

    const increaseIndex = () => {
        setIndex(prevIndex => (prevIndex === Steps.length - 1 ? 0 : prevIndex + 1));
    };
    return(
        <div className="relative w-full p-14 h-[750px] max-h-[750px] mb-6">
            <h5 className="inline-flex gap-1 text-xs text-gray-400 items-center">Lecture One <ArrowRight className="h-4"/> Page: {index+1}</h5>
            <div className="h-[600px] overflow-auto max-h-[600px] mt-3 w-full">
                {Steps[index]}
            </div>
            <div className="absolute bottom-3 left-0 px-14 flex flex-row w-full justify-between ">
                <button className="text-md inline-flex gap-1 items-center justify-center border-b-2 py-[0.75px] border-emerald-700 hover:border-gray-300 text-emerald-600 hover:text-gray-300 transition-transform ease-in-out duration-600" onClick={decreaseIndex}> <ArrowLeft className="h-5"/> Prev</button>
                <button className="text-md inline-flex gap-1 items-center justify-center border-b-2 py-[0.75px] border-emerald-700 hover:border-gray-300 text-emerald-600 hover:text-gray-300 transition-transform ease-in-out duration-600" onClick={increaseIndex}> Next<ArrowRight className="h-5"/></button>
            </div>
        </div>
    )
}