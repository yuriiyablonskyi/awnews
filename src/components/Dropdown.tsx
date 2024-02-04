import { useState } from "react";
import Arrow from '../assets/arrow.svg'

type DropdownProps = {
  title: string;
  options: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative m-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={'bg-blue-500 text-white py-2 px-4 rounded transition-opacity'}
      >
        <img src={Arrow} className={`${isOpen && 'rotate-180'}`} alt="arrow select" />
        {title}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 bg-white shadow-md border border-gray-300 mt-2 rounded">
          <ul className="list-none p-2">
            {options.map((option: string) => (
              <li className="py-2 px-4 hover:bg-gray-100"><a href="/link1" className="cursor-pointer">{option}</a></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown


