import React, { useState, useEffect } from 'react';
import Guide from './Guide';
import video from './background-video.mp4';
import './Home.scss';

const Main = () => {
	const [hide, handleBox] = useState(false);
	const [content, setContent] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!localStorage.getItem('hasLoaded')) {
			const hasLoaded = setTimeout(() => {
				setLoading(false);
				localStorage.setItem('hasLoaded', true);
			}, 5000);
			return () => {
				clearTimeout(hasLoaded);
			};
		} else {
			setLoading(false);
		}
	}, []);

	const box = document.querySelector('.Landing__Box');

	const hideTip = () => {
		if (window.scrollY > 125) {
			handleBox(true);
		} else handleBox(false);
	};

	useEffect(() => {
		window.addEventListener('scroll', hideTip);
		return () => {
			window.removeEventListener('scroll', hideTip);
		};
	}, []);

	useEffect(() => {
		const text = ['Travel', ' Plan', ' Explore'];
		const interval = setTimeout(
			() => {
				text.forEach((word, i) => {
					setTimeout(() => {
						setContent((prevWord) => [...prevWord, word]);
					}, i * 1500);
				});
			},
			loading ? 6500 : 4500
		);
		return () => {
			clearTimeout(interval);
		};
	}, [loading]);

	useEffect(() => {
		if (!localStorage.getItem('hasLoaded')) {
			const videoInterval = setTimeout(() => {
				const video = document.querySelector('.Landing__Background');
				video.play();
			}, 5250);
			return () => {
				clearTimeout(videoInterval);
			};
		} else {
			const video = document.querySelector('.Landing__Background');
			video.play();
		}
	}, []);

	return (
		<>
			{loading && !localStorage.getItem('hasLoaded') && (
				<div className='Loading'>
					<img
						className='Loading__Image'
						src='/Images/Home/earth-loading.svg'
						alt='loading...'
					/>
				</div>
			)}
			<div className='Landing'>
				<video className='Landing__Background' src={video} loop muted></video>
				<h5 className='Landing__Caption'>{content}</h5>
				<div className={`Landing__Box ${hide && box.classList.add('HideBox')}`}>
					<p>See More</p>
					<img
						className='Arrow'
						src='./Images/Home/down-arrow.png'
						alt='See More'
					/>
				</div>
			</div>
			{!loading && <Guide />}
		</>
	);
};

export default Main;
