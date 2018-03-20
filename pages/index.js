import Head from 'next/head';
import stylesheet from '../styles/styles.scss';

const sleep = s => new Promise(resolve => setTimeout(resolve, s * 1000));

export default class Index extends React.Component {
	state = {
		word: null,
		theme: 'dark',
		rate: 500,
		reading: false,
	};

	changeTheme = () => {
		this.setState({ theme: this.state.theme === 'dark' ? 'light' : 'dark' });
	}

	startReading = async () => {
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

	render() {
		return (
			<div>
				<Head>
					<title>Flash - A Speed Reading App</title>
					<style>{stylesheet}</style>
				</Head>
				<div className={`main ${this.state.theme} ${this.state.reading && 'reading'}`}>
					<span>{this.state.word}</span>
					<textarea ref={(ref) => { this.textarea = ref; }} placeholder="Paste your text here..." />
					<div className="rate">
						<span>Rate:</span>
						<input
							type="text"
							defaultValue={this.state.rate}
							onChange={e => this.setState({ rate: e.target.value || 600 })}
						/>
						<span>WPM</span>
					</div>
					<button onClick={this.start}>Engage {'>'}</button>
				</div>
				<button onClick={this.changeTheme} className={`theme-button ${this.state.reading && 'reading'}`}>{this.state.theme}</button>
				<p className={`attribution ${this.state.reading && 'reading'}`}>
					<span>Shamelessly ripped off from</span>
					Inspired by <a target="_blank" rel="noopener noreferrer" href="https://www.producthunt.com/posts/spdr">Spdr</a>
				</p>
			</div>
		);
	}
}
