import React, { useEffect } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from 'axios';
import { useState } from "react";
const Main = () => {
    const [pokedata, setPokedata] = useState([]);
    const [loading, setloading] = useState(true);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
    const [nextUrl, setNexturl] = useState();
    const [prevUrl, setPrevurl] = useState();
    const [pokeDex, setPokeDex] = useState();
    const Pokefun = async () => {
        setloading(true);
        const res = await axios.get(url);
        // console.log(res.data.results);
        setNexturl(res.data.next);
        setPrevurl(res.data.previous);
        getPokemon(res.data.results);
        setloading(false);

    }
    const getPokemon = async (res) => {
        res.map(async (item) => {
            const result = await axios.get(item.url)
            setPokedata(state => {
                state = [...state, result.data]
                state.sort((a, b) => a.id > b.id ? 1 : -1)
                return state;
            })
        })
    }
    useEffect(() => {
        Pokefun();

    }, [url])
    return (
        <>
            <div className="container">
                <div className="left-content">
                    <Card pokemon={pokedata} loading={loading} infoPokemon={poke => setPokeDex(poke)} />

                    <div className="btn-group">
                        {prevUrl && <button onClick={() => {
                            setPokedata([])
                            setUrl(prevUrl)
                        }}>Previous</button>}

                        {nextUrl && <button onClick={() => {
                            setPokedata([])
                            setUrl(nextUrl)
                        }}>Next</button>}
                    </div>

                </div>
                <div className="right-content">
                    <Pokeinfo data={pokeDex} />
                </div>

            </div>

        </>
    )
}
export default Main;