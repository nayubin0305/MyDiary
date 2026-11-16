import "./SearchBar.css";

interface SearchbarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar = ({value, onChange}: SearchbarProps) => {
    return(
        <div className="SearchBar" role="search">
            <input type="search" name="keyword" aria-label="일기 내용 검색" placeholder="일기 내용 검색" value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
};

export default SearchBar;