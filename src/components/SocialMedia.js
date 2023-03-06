import Image from "./Image";
import vk from "../images/vk.png"
import inst from "../images/insta.png"
import tg from "../images/telegram.png"
import github from "../images/github.png"

const SocialMedia = () => {
    return(
        <section className="contacts">
            <ul className="contacts__list">
                <li className="contacts__item">
                    <a href="https://vk.com/valera_kudryavtsev" target="_blank" rel="noreferrer">
                        <Image className="contacts__item-icon" src={vk} alt="vk" />
                    </a>
                </li>
                <li className="contacts__item">
                    <a href="https://t.me/valera_kudryavtsev" target="_blank" rel="noreferrer">
                        <Image className="contacts__item-icon" src={tg} alt="telegram" />
                    </a>
                </li>
                <li className="contacts__item">
                    <a href="https://www.instagram.com/valera_kudryavtsev/" target="_blank" rel="noreferrer">
                        <Image className="contacts__item-icon" src={inst} alt="inst" />
                    </a>
                </li>
                <li className="contacts__item">
                    <a href="https://github.com/ValeraKudryavtsev" target="_blank" rel="noreferrer">
                        <Image className="contacts__item-icon git-icon" src={github} alt="github" />
                    </a>
                </li>
            </ul>
        </section>
    )
}

export default SocialMedia