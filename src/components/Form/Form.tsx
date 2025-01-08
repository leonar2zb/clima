import styles from './Form.module.css'
import { countries } from '../../data/countries'
import { ChangeEvent, FormEvent, useState } from 'react'
import { SearchType } from '../../types'
import Alert from '../Alert/Alert'

type fetchWeatherProps = {
    fetchWeather: () => void
}

export default function Form({ fetchWeather }: fetchWeatherProps) {
    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setAlert('')
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Object.values(search).includes('')) {
            setAlert('Todos los campos son obligatorios')
            return
        }
        fetchWeather()
    }

    return (
        <form className={styles.form}
            onSubmit={handleSubmit}
        >
            {alert && <Alert>{alert}</Alert>}
            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input type="text"
                    name='city'
                    placeholder='Ciudad'
                    id='city'
                    value={search.city}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="country">País:</label>
                <select name="country"
                    id='country'
                    value={search.country}
                    onChange={handleChange}
                >
                    <option value="">--Seleccione país--</option>
                    {countries.map(country => (
                        <option value={country.code} key={country.code}>{country.name}</option>
                    ))}
                </select>
            </div>
            <input type="submit" value='Consultar clima'
                className={styles.submit} />
        </form >
    )
}