import styles from './Form.module.css'
import { countries } from '../../data/countries'
export default function Form() {
    return (
        <form className={styles.form}>
            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input type="text"
                    name='city'
                    placeholder='Ciudad' />
            </div>
            <div className={styles.field}>
                <label htmlFor="country">País:</label>
                <select name="country">
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