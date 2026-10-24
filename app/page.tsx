'use client'

import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Question = {
  question: string
  options: string[]
  answer: number
  note: string
}

const questions: Question[] = [
  {
    question: '¿Cuál es la capital de España?',
    options: ['Barcelona', 'Madrid', 'Sevilla', 'Valencia'],
    answer: 1,
    note: 'Madrid es la capital y la ciudad más poblada de España.',
  },
  {
    question: '¿Qué significa “biblioteca” en inglés?',
    options: ['Bookstore', 'Library', 'Bookcase', 'Notebook'],
    answer: 1,
    note: 'Library significa biblioteca; bookstore significa librería.',
  },
  {
    question: 'Completa: “Me ___ mucho la música.”',
    options: ['gusta', 'gustan', 'gustas', 'gustamos'],
    answer: 0,
    note: 'Usamos “gusta” porque la música está en singular.',
  },
  {
    question: '¿Cuál de estos animales es un mamífero?',
    options: ['El delfín', 'La tortuga', 'El águila', 'La rana'],
    answer: 0,
    note: 'Aunque vive en el agua, el delfín respira aire y es un mamífero.',
  },
  {
    question: '¿Cuántos días tiene una semana?',
    options: ['Cinco', 'Seis', 'Siete', 'Ocho'],
    answer: 2,
    note: 'Una semana tiene siete días: lunes, martes, miércoles, jueves, viernes, sábado y domingo.',
  },
]

export default function Page() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[current]
  const isAnswered = selected !== null
  const isCorrect = selected === question.answer
  const progress = ((current + (isAnswered ? 1 : 0)) / questions.length) * 100

  function chooseOption(index: number) {
    if (isAnswered) return
    setSelected(index)
    if (index === question.answer) setScore((value) => value + 1)
  }

  function nextQuestion() {
    if (current === questions.length - 1) {
      setFinished(true)
      return
    }
    setCurrent((value) => value + 1)
    setSelected(null)
  }

  function restart() {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <main className="quiz-shell flex min-h-screen items-center justify-center px-5 py-10">
        <section className="result-card w-full max-w-2xl rounded-[2rem] border border-[#ded9ce] bg-[#fffdf8] px-6 py-12 text-center shadow-[0_24px_70px_rgba(47,57,41,0.10)] sm:px-12">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-[#e8efcf] text-[#607343]"><Sparkles aria-hidden="true" /></div>
          <p className="eyebrow">¡Quiz completado!</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#26322b] sm:text-5xl">Tu resultado</h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-[#73776b]">Has respondido correctamente a <strong className="text-[#26322b]">{score} de {questions.length}</strong> preguntas.</p>
          <div className="mx-auto my-9 flex size-36 flex-col items-center justify-center rounded-full border-[10px] border-[#c8d99a] bg-[#f1f5df]"><span className="text-4xl font-semibold text-[#53652e]">{percentage}%</span><span className="text-xs font-medium uppercase tracking-[0.16em] text-[#74815b]">acierto</span></div>
          <Button onClick={restart} className="h-12 rounded-xl bg-[#26322b] px-6 text-sm font-semibold text-[#fffdf8] hover:bg-[#394a3c]"><RotateCcw data-icon="inline-start" />Intentarlo de nuevo</Button>
        </section>
      </main>
    )
  }

  return (
    <main className="quiz-shell min-h-screen px-5 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3"><div className="brand-mark flex size-10 items-center justify-center rounded-xl bg-[#26322b] text-[#f7c66a]"><Sparkles aria-hidden="true" /></div><span className="text-lg font-semibold tracking-[-0.03em] text-[#26322b]">ClaroQuiz</span></div>
          <span className="rounded-full bg-[#e8efcf] px-3 py-1.5 text-xs font-semibold tracking-[0.08em] text-[#607343]">ESPAÑOL · NIVEL A1</span>
        </header>

        <section className="rounded-[2rem] border border-[#ded9ce] bg-[#fffdf8] p-6 shadow-[0_24px_70px_rgba(47,57,41,0.08)] sm:p-10">
          <div className="mb-9 flex items-end justify-between gap-4"><div><p className="eyebrow">Pregunta {current + 1} de {questions.length}</p><h1 className="mt-2 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#26322b] sm:text-4xl">{question.question}</h1></div><span className="text-sm font-semibold text-[#8b8d81]">{Math.round(progress)}%</span></div>
          <div className="mb-10 h-2 overflow-hidden rounded-full bg-[#e8e5dc]"><div className="h-full rounded-full bg-[#a8c06d] transition-all duration-500" style={{ width: `${progress}%` }} /></div>
          <div className="grid gap-3" role="radiogroup" aria-label="Opciones de respuesta">{question.options.map((option, index) => { const correct = isAnswered && index === question.answer; const wrong = isAnswered && selected === index && !correct; return <button key={option} type="button" role="radio" aria-checked={selected === index} disabled={isAnswered} onClick={() => chooseOption(index)} className={`option-card flex min-h-16 items-center gap-4 rounded-2xl border px-4 text-left transition-all ${correct ? 'border-[#a8c06d] bg-[#f1f5df] text-[#4f642c]' : wrong ? 'border-[#e5aaa0] bg-[#fff0ed] text-[#994d42]' : selected === index ? 'border-[#a8c06d] bg-[#f8faef]' : 'border-[#e5e1d8] bg-[#fffdf8] text-[#4b5148] hover:-translate-y-0.5 hover:border-[#a8c06d] hover:shadow-[0_8px_20px_rgba(95,115,67,0.10)]'}`}><span className={`flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${correct ? 'bg-[#d9e7ae]' : wrong ? 'bg-[#f4d2cb]' : 'bg-[#f0eee7] text-[#777a70]'}`}>{correct ? <Check aria-hidden="true" /> : wrong ? <X aria-hidden="true" /> : String.fromCharCode(65 + index)}</span><span className="text-sm font-medium sm:text-base">{option}</span></button>})}</div>
          {isAnswered && <div className={`mt-6 rounded-2xl px-4 py-3 text-sm leading-6 ${isCorrect ? 'bg-[#f1f5df] text-[#53652e]' : 'bg-[#fff0ed] text-[#994d42]'}`}><strong>{isCorrect ? '¡Muy bien!' : 'Casi...'}</strong> {question.note}</div>}
          <div className="mt-8 flex items-center justify-between border-t border-[#eeeae1] pt-6"><span className="text-sm text-[#8b8d81]">Puntuación: <strong className="text-[#4b5148]">{score}/{questions.length}</strong></span><Button onClick={nextQuestion} disabled={!isAnswered} className="h-12 rounded-xl bg-[#26322b] px-5 text-sm font-semibold text-[#fffdf8] hover:bg-[#394a3c] disabled:bg-[#d7d5cc]">{current === questions.length - 1 ? 'Ver resultado' : 'Siguiente'}<ArrowRight data-icon="inline-end" /></Button></div>
        </section>
        <p className="text-center text-xs text-[#9a9b91]">Aprende a tu ritmo · Cada pregunta es una oportunidad</p>
      </div>
    </main>
  )
}
