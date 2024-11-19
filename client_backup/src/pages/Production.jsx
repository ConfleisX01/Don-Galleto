import CardProduction from "../components/Production/cards";
import SearchInput from "../components/Production/searchInput";


export default function Production() {
    return (


        <>

            <div class="bg-white p-5 rounded-lg">


                <div class='flex mb-10'>
                    <h1 class="font-medium text-4xl" > Lista de produccion</h1>
                </div>


                <div class='bg-white p-3 rounded-lg'>

                    <SearchInput />
                    <CardProduction priority={1} /> 
                    <CardProduction priority={2} />  
                    <CardProduction priority={3} />  
                </div>
            </div>

            <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </>

    );
}
