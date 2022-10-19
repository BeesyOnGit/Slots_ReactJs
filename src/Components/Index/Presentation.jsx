import "./Presentation.css"

function Presentation(props) {
    const darkmode=window.localStorage.user_darkmode

    return(
        <section className="presentation">
            <div className="presentationlogo" id="bodylogo">
                <h2 >What is</h2>
                <img src={darkmode == 'true'?"/Logo Slots darkmode.svg":"/Logo Slots.svg"} />
                <h1> ?</h1>
            </div>
            <p>We are Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet cumque quam ea voluptatibus amet dolorem enim unde quibusdam tenetur aperiam. Ab asperiores, laudantium iusto voluptate sed repudiandae aspernatur cupiditate nesciunt praesentium at aliquam perferendis vero eum iure, aut amet facere, impedit accusantium laboriosam! Nobis quae, id dolorem, error aspernatur ratione, distinctio molestias accusamus in dicta a sunt magnam explicabo. A debitis harum beatae quam, consequuntur, tempora laudantium id consectetur totam eos nostrum voluptates, ab enim nesciunt aliquid iusto ducimus nihil quae. Odit, recusandae iste! Quisquam alias id reprehenderit fuga tenetur laboriosam molestiae sit officiis. Dolore blanditiis numquam perspiciatis officia eaque nemo, asperiores voluptates dignissimos voluptatem suscipit aperiam recusandae quibusdam labore ipsa, reprehenderit ratione sed. Similique cum nisi sed voluptatibus eligendi adipisci ipsa perspiciatis fuga natus laborum rem atque, tempora nostrum deserunt enim, voluptates neque optio? Quos vero, architecto dolor hic nobis minima rerum quibusdam ea dolorem provident inventore, nam et! Harum iste porro doloribus. Provident alias magni explicabo sit blanditiis. Labore similique quos, ut dolore iusto inventore adipisci exercitationem ducimus iure quaerat corrupti recusandae, odit consectetur totam, ex voluptatum sint. Natus, numquam suscipit perferendis ratione explicabo tenetur laboriosam eaque dignissimos, ab omnis enim ex assumenda mollitia itaque, libero optio quidem?</p>
            <h2>Our Games :</h2>
            <hr className="presentationseparator"/>
        </section>
    )
    
}

export default Presentation