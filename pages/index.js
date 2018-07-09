import Head from 'next/head';
import stylesheet from '../styles/styles.scss';
import GoogleAnalytics from '../components/GoogleAnalytics';

const sleep = s => new Promise(resolve => setTimeout(resolve, s * 1000));

export default class Index extends React.Component {
	state = {
		word: null,
		theme: 'dark',
		rate: 300,
		reading: false,
	};

	changeTheme = () => {
		this.setState({ theme: this.state.theme === 'dark' ? 'light' : 'dark' });
	}

	startReading = async () => {
		if (this.state.reading) return;
		this.setState({ reading: true });
		await sleep(0.7);
	}

	start = async () => {
		await this.startReading();
		const words = this.textarea.value.replace(/\n/g, ' ').split(' ');

		for (let i = 0; i < words.length; i += 1) {
			const delay = (1000 / (this.state.rate / 60)) * (i + 1);

			const word = words[i];

			setTimeout(() => {
				if (i === words.length - 1) {
					this.setState({ word, reading: false });
				} else {
					this.setState({ word });
				}
			}, delay);
		}
	}

	bodyClick = () => {
		if (this.state.reading) {
			this.setState({ reading: false });
		}
	}

	render() {
		return (
			<div onClick={this.bodyClick}>
				<Head>
					<title>Flash - A Speed Reading App</title>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta
						name="description"
						content="Flash is a web app that allows you to speed read lots of text by rapidly flashing words one by one."
					/>
					<meta property="og:title" content="Flash - A Speed Reading App" />
					<meta
						property="og:description"
						content="Flash is a web app that allows you to speed read lots of text by rapidly flashing words one by one."
					/>
					<meta property="og:image" content="/static/preview-img.jpg" />
					<meta name="msapplication-TileColor" content="#ffffff" />
					<meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
					<link rel="apple-touch-icon" sizes="57x57" href="/static/favicons/apple-icon-57x57.png" />
					<link rel="apple-touch-icon" sizes="60x60" href="/static/favicons/apple-icon-60x60.png" />
					<link rel="apple-touch-icon" sizes="72x72" href="/static/favicons/apple-icon-72x72.png" />
					<link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-icon-76x76.png" />
					<link
						rel="apple-touch-icon"
						sizes="114x114"
						href="/static/favicons/apple-icon-114x114.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="120x120"
						href="/static/favicons/apple-icon-120x120.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="144x144"
						href="/static/favicons/apple-icon-144x144.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="152x152"
						href="/static/favicons/apple-icon-152x152.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/static/favicons/apple-icon-180x180.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="192x192"
						href="/static/favicons/android-icon-192x192.png"
					/>
					<link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="96x96" href="/static/favicons/favicon-96x96.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
					<link rel="shortcut icon" href="/static/favicons/favicon.ico" type="image/x-icon" />
					<link rel="icon" type="image/png" href="/static/favicons/apple-icon.png" />
					<link rel="manifest" href="/static/manifest.json" />
					<GoogleAnalytics />
					<style>{stylesheet}</style>
				</Head>
				<div className={`main ${this.state.theme} ${this.state.reading && 'reading'}`}>
					<span style={this.state.fontSize ? { fontSize: this.state.fontSize } : null}>{this.state.word || 'Flash - A Speed Reading App'}</span>
					<textarea ref={ref => {
						this.textarea = ref;
					}} placeholder="Paste your text here..." defaultValue="Flash is a speed reading app that allows you to read large texts fast by flashing words one by one. You can read up to 1000 words / min using this technique." />
					<div className="rate">
						<span>Rate:</span>
						<input type="text" defaultValue={this.state.rate} onChange={e => this.setState(
							{ rate: e.target.value || 600 },
						)} />
						<span>WPM</span>
					</div>
					<button onClick={this.start}>Start Reading {'>'}</button>
				</div>
				<button onClick={this.changeTheme} className={`theme-button ${this.state.reading && 'reading'}`}>
					{this.state.theme}
				</button>
				<p className={`attribution ${this.state.reading && 'reading'}`}>
					<span>Shamelessly ripped off from</span>
					Inspired by <a target="_blank" rel="noopener noreferrer" href="https://www.producthunt.com/posts/spdr">
						Spdr
					</a>
					<br />
					Made by <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/MaxRovensky">
						Max Rovensky
					</a>
				</p>
			</div>
		);
	}
}
