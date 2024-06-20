import React from 'react'
import { motion } from 'framer-motion'

export const TypeFilter = ({    type, setType }) => {
  return (
    <div>
    <div className="m-2 p-1">
      <label htmlFor="type" className="block text-gray-100 ms-2">
        Filter Type
      </label>
      <motion.select
      whileHover={{ scale: 1.05 }}
        id="type"
        value={type} // Update this line to use the correct state variable
        className="px-4 w-50 py-2 border border-gray-600 rounded bg-gray-900 outline-1 outline-cyan-500 outline-double"
        placeholder="Select type"
        onChange={(e) => setType(e.target.value)}
        required
      >
        <option value="all">All</option>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </motion.select>
    </div>
  </div>
  )
}
