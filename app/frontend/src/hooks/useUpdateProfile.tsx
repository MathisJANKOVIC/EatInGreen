import { useState } from 'react'
import { profileType } from '../components/types/profileType'

const useUpdateProfile = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const updateProfile = async (id: string, profileData: profileType): Promise<void> => {
    setLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        throw new Error('No authentication token found')
      }

      const response = await fetch(`/api/user/profile/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(`HTTP error ${response.status}: ${errorMessage}`)
      }

      // Optionally, you can process the response if needed
      const result = await response.json()
      console.log('Profile updated:', result)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return { updateProfile, loading, error }
}

export default useUpdateProfile
