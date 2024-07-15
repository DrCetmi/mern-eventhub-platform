import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "@material-tailwind/react";

function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div className="relative flex items-center w-full lg:w-auto gap-2">
      <Input
        type="search"
        color="black"
        label="Type here..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pr-20"
        containerProps={{
          className: "min-w-[200px] w-full lg:w-auto",
        }}
      />
      <Button
        size="sm"
        color="black"
        className="!absolute right-1 top-1 rounded bg-[#f76b1b] w-[4.5rem]"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
}

export default SearchComponent;
