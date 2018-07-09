export default () => (
	<React.Fragment>
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-53795068-4" />
		<script
			dangerouslySetInnerHTML={{
				// Imma leave Google Analytics here for now
				__html: `
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());

					gtag('config', 'UA-53795068-4');
				`,
			}}
		/>
	</React.Fragment>
);
