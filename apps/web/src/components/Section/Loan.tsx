import { InputAdornment, Slider, styled, TextField } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CommonComponentProps } from 'src/types/props'

interface SectionLoanProps {
  loanAmount: number
  down?: number
  interestRate?: number
  tax?: number
  term?: number
}

const SliderStyles = styled(Slider)({
  '& .MuiSlider-thumb': {
    backgroundColor: '#F2B33D',
    width: '15px',
    height: '15px',
  },
  '& .MuiSlider-markLabel': {
    fontSize: '0.7rem',
    top: '30px',
    color: '#737373',
  },
  '& .MuiSlider-track': {
    border: 'none',
  },
})

const marks = [
  { value: 0, label: '0%' },
  { value: 20, label: '20%' },
  { value: 40, label: '40%' },
  { value: 60, label: '60%' },
  { value: 80, label: '80%' },
  { value: 100, label: '100%' },
]

export default function SectionLoan({
  props,
  values,
}: {
  props?: CommonComponentProps
  values: SectionLoanProps
}) {
  /* --------------------------------- States --------------------------------- */
  const [installment, setInstallment] = useState(values.loanAmount)
  const [loanAmount, setLoanAmount] = useState(values.loanAmount)
  const [down, setDown] = useState(values.down || 0)
  const [downPercent, setDownPercent] = useState(0)
  const [interestRate, setInterestRate] = useState(values.interestRate || 2)
  const [term, setTerm] = useState(values.term || 48)
  const [tax, setTax] = useState(0.07)

  /* --------------------------------- Methods -------------------------------- */
  const calculateInstallment = useCallback(() => {
    const financingAmount = loanAmount - down // ยอดจัด
    const interestRateAmount = financingAmount * (interestRate / 100) // ดอกเบี้ยต่อปี
    const taxIntallmentAmount = interestRateAmount * tax
    const interestInstallmentAmount =
      (interestRateAmount + taxIntallmentAmount) / (term / 12)
    setInstallment(interestInstallmentAmount)
  }, [down, interestRate, loanAmount, tax, term])

  const calculateDown = useCallback(() => {
    setDown(loanAmount * (downPercent / 100))
  }, [downPercent])

  /* --------------------------------- Watches -------------------------------- */
  useEffect(() => {
    calculateInstallment()
  }, [calculateInstallment])

  useEffect(() => {
    calculateDown()
  }, [calculateDown])

  /* ---------------------------------- Doms ---------------------------------- */
  return (
    <div className={`${props?.className || ''} section-loan`} {...props}>
      <div className="grid grid-cols-1 rounded-lg border border-neutral-300 shadow-xl lg:grid-cols-3 ">
        {/* Title */}
        <div className="gradient-brown 10 col-span-1 flex items-center rounded-t-lg p-5 text-center text-3xl font-bold lg:rounded-l-lg">
          <div className="mx-auto inline-block">
            <div className="mb-3 border-b-4 border-primary-500 pb-3">
              คำนวนสินเชื่อ
            </div>
            <div>เพื่อรถคันนี้</div>
          </div>
        </div>

        {/* Cac */}
        <div className="col-span-2 grid divide-y rounded-b-lg bg-white p-10 px-5 md:grid-cols-2 md:divide-x lg:divide-y-0 lg:rounded-r-lg">
          {/* calc summary */}
          <div className="pb-5 lg:pr-5 lg:pb-0">
            <div className="text-xl">คำนวนสินเชื่อรถยนต์</div>
            <div className="text-neutral-500">คำผ่อนชำระต่อเดือน</div>
            <div className="py-5 text-3xl font-bold">
              <span>฿ </span>
              <span>
                {installment.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </span>
              <span className="text-xl font-normal text-neutral-600">
                {' '}
                / เดือน
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="text-neutral-600">ยอดเงินกู้</div>
              {/* <div className="font-bold">฿ {loanAmount.toLocaleString()}</div> */}
              <div className="flex w-[140px] rounded-lg border border-neutral-300 shadow-md">
                <input
                  type="number"
                  id="search-dropdown"
                  step={1}
                  className="w-full rounded-l-lg border-none p-2 pr-0 text-sm focus:border-none focus:shadow-none focus:outline-none focus:ring-0"
                  placeholder="ค้นหาตามชื่อรถ, รุ่น, ยี่ห้อ, ปี"
                  value={loanAmount}
                  min={1}
                  onChange={(e) => setLoanAmount(+e.target.value)}
                />
                <label className="inline-flex items-center rounded-r-lg bg-white pl-3 pr-2">
                  ฿
                </label>
              </div>
            </div>
            <div className="mt-3 text-sm text-neutral-400">
              หมายเหตุ : การคำนวณนี้เป็นการประมาณยอด
              เงินสินเชื่อเท่านั้นโดยวงเงินตามจริงนั้นจะขึ้นอยู่กับเครดิตของแต่ละบุคคลและบางกรณี
            </div>
          </div>

          {/* calc actions */}
          <div className="flex flex-col justify-between pl-5 pt-5 text-sm lg:pt-0">
            <div>
              {/* อัตราดอกเบี้ย */}
              <div className="grid grid-cols-2 items-center gap-5">
                <div className="text-neutral-500">อัตราดอกเบี้ย</div>
                <div className="flex rounded-lg border border-neutral-300 shadow-md">
                  <input
                    type="number"
                    id="search-dropdown"
                    step={1}
                    className="w-full rounded-l-lg border-none p-2 pr-0 text-sm focus:border-none focus:shadow-none focus:outline-none focus:ring-0"
                    placeholder="ค้นหาตามชื่อรถ, รุ่น, ยี่ห้อ, ปี"
                    value={interestRate}
                    min={1}
                    max={100}
                    onChange={(e) => setInterestRate(+e.target.value)}
                  />
                  <label className="inline-flex items-center rounded-r-lg bg-white pl-3 pr-2">
                    %
                  </label>
                </div>
              </div>

              {/* จำนวนเงินดาวน์ */}
              <div className="mt-2 grid grid-cols-2 items-center gap-x-5">
                <div className="text-neutral-500">จำนวนเงินดาวน์</div>
                <div className="flex rounded-lg border border-neutral-300 shadow-md">
                  <input
                    type="text"
                    id="search-dropdown"
                    disabled
                    className="w-full rounded-l-lg border-none p-2 pr-0 text-sm focus:border-none focus:shadow-none focus:outline-none focus:ring-0"
                    placeholder="ค้นหาตามชื่อรถ, รุ่น, ยี่ห้อ, ปี"
                    value={down.toLocaleString()}
                    min={0}
                    onChange={(e) => setDown(+e.target.value)}
                  />
                  <label className="inline-flex items-center rounded-r-lg bg-white pl-3 pr-2">
                    ฿
                  </label>
                </div>
                <div className="col-span-2 px-2">
                  <SliderStyles
                    size="small"
                    getAriaLabel={() => 'Price ranges'}
                    value={downPercent}
                    onChange={(e, v) => setDownPercent(v as number)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                    step={20}
                    marks={marks}
                    className="w-full"
                    valueLabelFormat={(v: number) => `${v.toLocaleString()}%`}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="text-neutral-500">ระยะเวลาผ่อน</div>
              <div className="mt-2 grid grid-cols-6 gap-1">
                {[24, 36, 48, 60, 72, 84].map((month, index) => (
                  <button
                    value={month}
                    key={index}
                    onClick={(e: any) => {
                      setTerm(+e.target.value)
                    }}
                    className={`flex cursor-pointer items-center justify-center rounded border border-neutral-300 bg-slate-100 px-2 shadow-sm ${
                      term === month ? 'bg-primary-500 text-white' : ''
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
