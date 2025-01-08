import styles from './Form.module.css'
import { countries } from '../../data/countries'
import { ChangeEvent, useState } from 'react'
import { SearchType } from '../../types'

export default function Form() {
    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form className={styles.form}>
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
        </form>
    )
}