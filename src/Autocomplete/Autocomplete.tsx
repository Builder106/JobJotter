import React from "react";
import {
   ChangeEvent,
   useCallback,
   FormEvent,
   useEffect,
   useState
 } from "react";
 import {
   SWrapper,
   SProvidedBy,
   SQueriesWrapper,
   SQueries,
   SQueryImage,
   SQueryDomain,
   SNotFoundIcon,
   SQueryName,
   SQuery,
   SLabelSuffix,
   SNotFound,
   SInput
 } from "./Autocomplete.style";
 import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
 type TQuery = {
   name: string;
   domain: string;
   icon: string;
 };
 
 export type TAutocomplete = {
   value: string;
   query?: TQuery;
   queries: TQuery[];
 };
 
 interface IAutocomplete {
   onSubmit: ({ value, queries, query }: TAutocomplete) => void;
   placeholder: string;
 }
 
 export const Autocomplete = ({ onSubmit, placeholder }: IAutocomplete) => {
   const [value, setValue] = useState({ text: "", active: false });
   const [queries, setQueries] = useState<TQuery[]>([]);
 
   const handleSubmit = (e: FormEvent) => {
     e.preventDefault();
 
     const text = queries?.[0]?.domain || value.text;
     onSubmit({ value: text, query: undefined, queries });
     setValue({ text, active: false });
     setQueries([]);
   };
 
   const handleClick = (query: TQuery) => {
     onSubmit({ value: value.text, query, queries });
     setValue({ text: query.domain, active: false });
   };
 
   const reset = () => {
     setQueries([]);
     setValue({ text: "", active: false });
   };
 
   const getQueries = useCallback(async (searchValue: string) => {
     if (searchValue !== "") {
       try {
         const url = `https://api.brandfetch.io/v2/search/${searchValue}`;
 
         const res = await fetch(url);
         if (res.ok) {
           const data = await res.json();
           console.log("API Response:", data); // Log the API response
           setQueries(data);
         }
       } catch (err) {
         console.log("Something went wrong, try again later.");
       }
       return;
     }
 
     setQueries([]);
   }, []);
 
   useEffect(() => {
     getQueries(value.text);
   }, [getQueries, value.text]);
 
   return (
     <SWrapper>
       <SProvidedBy>
         Provided by{" "}
         <a href="https://brandfetch.com/" rel="noreferrer" target="_blank">
           Brandfetch
         </a>
       </SProvidedBy>
 
       <form onSubmit={handleSubmit}>
         <SInput
           placeholder={placeholder}
           value={value.text}
           onChange={(e: ChangeEvent<HTMLInputElement>) =>
             setValue({ text: e.target.value, active: true })
           }
         />
 
         {value.text !== "" && (
           <SLabelSuffix onClick={() => reset()}>
             <FontAwesomeIcon size="sm" icon={faTimes} />
           </SLabelSuffix>
         )}
       </form>
 
       {value.active && value.text !== "" && (
         <SQueriesWrapper>
           {queries.length ? (
             <SQueries>
               {queries.map((query, i) => (
                 <SQuery key={i} onClick={() => handleClick(query)}>
                   <SQueryImage>
                     <img src={query.icon} alt={query.name} />
                   </SQueryImage>
 
                   <SQueryName>{query.name || query.domain}</SQueryName>
 
                   <SQueryDomain>{query.domain}</SQueryDomain>
                 </SQuery>
               ))}
             </SQueries>
           ) : (
             <SNotFound>
               <SNotFoundIcon>
                 <FontAwesomeIcon size="xl" icon={faMagnifyingGlass} />
               </SNotFoundIcon>
 
               <p className="bold">Nothing found...</p>
 
               <br />
 
               <p>Search by entering it’s website URL for better result.</p>
             </SNotFound>
           )}
         </SQueriesWrapper>
       )}
     </SWrapper>
   );
 };
 