import { useEffect, useState } from "react";
import "./styles.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [showResults, setShowResults] = useState(false);
  useEffect(() => {
    const FeatchData = async () => {
      const data = await fetch(
        "https://dummyjson.com/recipes/search?q=" + search
      );
      const OrginalData = await data.json();
      // console.log(OrginalData);
      setResult(OrginalData?.recipes);
      console.log("API Call", search);
    };
    const Timer = setTimeout(FeatchData, 400);
    return () => {
      clearTimeout(Timer);
    };
  }, [search]);

  return (
    <div className="App">
      <h4>Autocomplete SearchBar</h4>
      <div>
        <input
          type="text"
          className="search"
          value={search}
          onChange={(a) => setSearch(a.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
      </div>
      {showResults && (
        <div className="block">
          {result.map((r) => (
            <span key={r.id}>{r.name}</span>
          ))}
        </div>
      )}
    </div>
  );
};
export default App;
