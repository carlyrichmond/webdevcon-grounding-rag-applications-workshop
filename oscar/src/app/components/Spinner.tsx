'use client'
 
/* Movie spinner credit:
https://codepen.io/pozda/pen/XxoyKe 
*/
export default function Spinner() {
  return (
    <div className="loader">
        <div className="loader__filmstrip">
        </div>
        <p className="loader__text">
            loading
        </p>
    </div>
  )
}