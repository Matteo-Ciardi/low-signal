export default function Homepage() {
  return (
    <>
      <h1>Sono la Homepage</h1>

      {/* NEWSLETTER */}
      <section className="surface-card section-spacing">
        <div className="container-editorial">
          <p className="text-mono text-primary mb-4 text-center">
            AREA RISERVATA
          </p>
          <h2 className="text-center leading-none">
            ACCEDI SUBITO.
            <br />
            SENZA RUMORE
          </h2>
          <p className="mt-4 text-center">
            Avvisi sui nuovi lanci, accesso anticipato e qualche annuncio
            dall'underground.
            <br />
            Niente spam, noi non lo facciamo.
          </p>

          {/* CAMPO EMAIL ISCRIZIONE NEWSLETTER */}
          <form className="mt-10 flex items-center justify-between lg:px-150">
            <input
              type="text"
              placeholder="LA TUA EMAIL"
              className="input-base"
            />
            <button className="btn-primary">UNISCITI</button>
          </form>
        </div>
      </section>
    </>
  )
}
