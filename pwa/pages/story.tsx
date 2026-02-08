import { useState } from 'react'
import Page from '@/components/page'
import Section from '@/components/section'

const categories = ['Groceries', 'Transport', 'Utilities', 'Entertainment']

const Story = () => {
  const [amount, setAmount] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAddExpense = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://jibbles.netrunnerdebugs.party/api/transactions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          category: selectedCategory ? selectedCategory.toLowerCase() : null,
        }),
      })
      if (!res.ok) {
        throw new Error(`Failed to add expense: ${res.statusText}`)
      }
      // Optionally reset form
      setAmount('')
      setSelectedCategory('')
      alert('Expense added successfully!')
    } catch (err: unknown) {
      if (err instanceof Error) {
    setError(err.message)
  } else {
    setError(String(err))
  }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page>
      <Section>
        <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Enter amount"
              style={{ width: '100%', padding: 8, margin: '8px 0' }}
            />
          </label>

          <div style={{ marginBottom: 16 }}>
            <p>Select category:</p>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  marginRight: 8,
                  padding: '8px 16px',
                  backgroundColor: selectedCategory === category ? '#0070f3' : '#eee',
                  color: selectedCategory === category ? 'white' : 'black',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>

          <button
            onClick={handleAddExpense}
            disabled={!amount || !selectedCategory || loading}
            style={{
              padding: '10px 20px',
              backgroundColor: !amount || !selectedCategory ? '#aaa' : '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: !amount || !selectedCategory ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Adding...' : 'Add Expense'}
          </button>

          {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
        </div>
      </Section>
    </Page>
  )
}

export default Story
