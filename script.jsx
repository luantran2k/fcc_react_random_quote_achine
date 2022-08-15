const { useEffect, useState } = React;

const createTweetUrl = ({ quote, author }) => {
    return `https://twitter.com/intent/tweet?hashtags=quotes&text=${quote}${author}`;
};

const createTumblrUrl = ({ quote, author }) => {
    return `https://www.tumblr.com/widgets/share/tool?posttype=quote&caption=${encodeURIComponent(
        author
    )}&content=${encodeURIComponent(
        quote
    )}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;
};

const colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857",
];

const App = (props) => {
    const [data, setData] = useState();
    const [randomeQuote, setRandomeQuote] = useState();
    const transitionTime = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
            "--transition-time"
        )
    );

    const createRandomQuote = (data) => {
        const randomIndex = Math.floor(Math.random() * data.quotes.length);
        return data.quotes[randomIndex];
    };

    const changeColor = (colors) => {
        let index = Math.floor(Math.random() * colors.length);
        document.documentElement.style.setProperty("--color", colors[index]);
    };

    const clickNewQuote = () => {
        //handel fadeout text
        fadeOut(text, author);
        const fadeOutPromise = new Promise((resolve, reject) => {
            const fadeOutTimeOut = setTimeout(() => {
                setRandomeQuote(createRandomQuote(data));
                changeColor(colors);
            }, transitionTime * 1000);
            return fadeOutTimeOut;
        });
        fadeOutPromise.then((fadeOutTimeOut) => {
            clearTimeout(fadeOutTimeOut);
        });
    };

    useEffect(() => {
        fetch(
            "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
        )
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setRandomeQuote(createRandomQuote(data));
            })
            .catch((err) => console.log(err));
    }, []);

    //handel fadein text
    useEffect(() => {
        const text = document.querySelector("#text");
        const author = document.querySelector("#author");
        if (text) {
            const fadeInPromise = new Promise((resole, reject) => {
                const fadeInTimeout = setTimeout(() => {
                    fadeIn(text, author);
                }, transitionTime * 1000);
                return fadeInTimeout;
            });
            fadeInPromise.then((fadeInTimeout) => {
                clearTimeout(fadeInTimeout);
            });
        }
    });
    function fadeIn(text, author) {
        text.classList.add("active");
        author.classList.add("active");
    }

    function fadeOut(text, author) {
        text.classList.remove("active");
        author.classList.remove("active");
    }

    if (randomeQuote) {
        return (
            <div id="quote-box">
                <div id="text">
                    <i className="fa fa-quote-left"></i>
                    <span>{randomeQuote.quote}</span>
                </div>
                <div id="author">- {randomeQuote.author}</div>
                <div className="bottom-box">
                    <div className="share-links">
                        <a
                            href={createTweetUrl(randomeQuote)}
                            className="share-link"
                            id="tweet-quote"
                            target="_blank"
                        >
                            <i className="fa fa-twitter"></i>
                        </a>
                        <a
                            href={createTumblrUrl(randomeQuote)}
                            className="share-link"
                            id="tumblr-quote"
                            target="_blank"
                        >
                            <i className="fa fa-tumblr"></i>
                        </a>
                    </div>
                    <button id="new-quote" onClick={clickNewQuote}>
                        New quote
                    </button>
                </div>
            </div>
        );
    } else return <></>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
