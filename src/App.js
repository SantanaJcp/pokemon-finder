import * as React from 'react'
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from './pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemonInfo,setPokemonInfo] = React.useState(null)
  const [error,setError] = React.useState(null)
  React.useEffect(()=>{
    if (!pokemonName) {
      return
    }
    setPokemonInfo(null)
    setError(null)
    fetchPokemon(pokemonName)
        .then(pokemonData => setPokemonInfo(pokemonData))
        .catch(error => setError(error))
  },[pokemonName])
  if (error){
    return (
        <div role="alert">
          There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
        </div>
    )
  }else if (!pokemonName) {
    return 'Submit a pokemon'
  } else if (!pokemonInfo) {
    return <PokemonInfoFallback name={pokemonName} />
  } else {
    return <PokemonDataView pokemon={pokemonInfo} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
      <div className="pokemon-info-app">
        <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
        <hr />
        <div className="pokemon-info">
          <PokemonInfo pokemonName={pokemonName} />
        </div>
      </div>
  )
}

export default App
