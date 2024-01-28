import { FC } from "react";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";


interface FormProps {
    title: string;
    description: string;
    rating: number;
    location: string;
    setTitle: (value: string) => void;
    setDescription: (value: string) => void;
    setLocation: (value:string) => void;
    setRating: (value: number) => void;
    handleSubmit: () => void;
}
const ReviewForm: FC<FormProps> = ({
    title,
    description,
    rating,
    location,
    setTitle,
    setDescription,
    setLocation,
    setRating,
    handleSubmit,
}) => {
    const formSubmit = (e: any) => {
        e.preventDefault();
        if (rating < 0 || rating > 11) {
            alert("Rating must be between 0 and 10.");
            return;
        }
        handleSubmit();
        
    };

    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
        requestOptions: {
          /* Define search scope here */
        },
        debounce: 300,
    });

    const handleInput = (e: { target: { value: string; }; }) => {
        // Update the keyword of the input element
        setValue(e.target.value);
        setLocation(e.target.value)
    };

    
    const ref = useOnclickOutside(() => {
        // When the user clicks outside of the component, we can dismiss
        clearSuggestions();
    });

    const handleSelect = ({ description }: { description: string }) => () => {
        // When the user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();
    };


    const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });


    return (
        <form
            className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={(e) => formSubmit(e)}
        >
            <div className="w-full max-w-xs">
                
            <div className="mb-4" ref={ref}>
                    <label className="block text-gray-400 text-sm font-bold mb-2">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="Title"
                        value={location}
                        onChange={handleInput}
                        //disabled={!ready}
                    />
                    <ul>{renderSuggestions()}</ul>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2">
                        Description
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2">
                        Rating
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="rating"
                        type="number"
                        placeholder="Description"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        max={10}
                        min={0}
                    />
                </div>


                <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2">
                        location
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="location"
                        type="text"
                        placeholder="location"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ReviewForm;