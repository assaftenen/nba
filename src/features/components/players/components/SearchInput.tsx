type SearchInputProps = { searchTerm: string | undefined; handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void };
export const SearchInput = ({ searchTerm, handleSearchChange }: SearchInputProps) => {
    return (
        <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search players..."
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
        />
    );
};
