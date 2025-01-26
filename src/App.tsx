import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'

function App() {
  return (
  	<>
      <Router>
		<div>
			<Stack direction="column" 
				sx={{
    				justifyContent: "space-between",
    				alignItems: "center"
  				}}
			>
				<Stack direction="row" spacing={2}>
					    <div>Для теста: </div>
						<Link to="/">home</Link>
						<Link to="/login">Login</Link>
						<Link to="/register">Register</Link>
						<Link to="/notfound">NotFound</Link>	
				</Stack>
			</Stack>
		</div>

 		<Sheet 
			sx={{
		          	alignContent: "center",
				  	alignItems: "center",
					height: "90vh"
			}}
		>
			<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/*" element={<NotFoundPage />} />
			</Routes>
		</Sheet>
      </Router>
    </>
  )
}

export default App
