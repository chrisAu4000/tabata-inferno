import Inferno from 'inferno';

export default function App({ children }) {
    return (
        <div>
            <h1 style={{'text-align': 'center'}}>TABATA</h1>
            { children }
        </div>
    );
}
