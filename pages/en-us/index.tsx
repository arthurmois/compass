import React from 'react'
import { NextPage } from 'next'
import { useTheme, Grid, Input } from 'components'
import PackageIcon from '@geist-ui/icons/package'
import FeatherIcon from '@geist-ui/icons/feather'
import GitHubIcon from '@geist-ui/icons/github'
import { HomeCell } from 'lib/components'
import { Button } from '@geist-ui/core'
import { useRouter } from 'next/router'

const Application: NextPage<{}> = () => {
  const router = useRouter()
  const theme = useTheme()

  const [searchValue, setSearchValue] = React.useState()
  const inputHandler = (e: { target: { value: React.SetStateAction<undefined> } }) => {
    setSearchValue(e.target.value)
    console.log(e.target.value)
  }
  const searchHandler = () => {
    const defaultPath = `/en-us/clusterModule`
    router.push(defaultPath)
    console.log(searchValue)
  }

  return (
    <>
      <div className="layout">
        <div className="hero">
          <h1 className="title">Compass</h1>
          <h3 className="desc">A modern tool for the content-creator of today.</h3>
          <Input
            w="100%"
            font="1.125rem"
            py={0.75}
            value={searchValue}
            onChange={inputHandler}
            placeholder="Insert a YouTube link"
            className="search-input"
            clearable
          />
          <Button width="25%" onClick={searchHandler}>
            Search
          </Button>
        </div>

        <Grid.Container gap={2} justify="center">
          <Grid xs={24} md={8}>
            <HomeCell
              icon={<PackageIcon />}
              url="/en-us/components"
              title="Components"
              desc="Ever-increasing list of concise and aesthetic components."
            />
          </Grid>
          <Grid xs={24} md={8}>
            <HomeCell
              icon={<FeatherIcon />}
              url="/en-us/guide/themes"
              title="Customizable"
              desc="Configure sizes, colors, appearances, shapes, and more."
            />
          </Grid>
          <Grid xs={24} md={8}>
            <HomeCell
              icon={<GitHubIcon />}
              url="https://github.com/geist-org/geist-ui"
              title="Open Sourced"
              desc="Geist is open sourced and available free under MIT licence."
            />
          </Grid>
        </Grid.Container>
        <Grid.Container gap={2} justify="center">
          <Grid xs={24} md={8}>
            <HomeCell
              icon={<PackageIcon />}
              url="/en-us/components"
              title="Components"
              desc="Ever-increasing list of concise and aesthetic components."
            />
          </Grid>
          <Grid xs={24} md={8}>
            <HomeCell
              icon={<FeatherIcon />}
              url="/en-us/guide/themes"
              title="Customizable"
              desc="Configure sizes, colors, appearances, shapes, and more."
            />
          </Grid>
          <Grid xs={24} md={8}>
            <HomeCell
              icon={<GitHubIcon />}
              url="https://github.com/geist-org/geist-ui"
              title="Open Sourced"
              desc="Geist is open sourced and available free under MIT licence."
            />
          </Grid>
        </Grid.Container>
        <Grid.Container gap={2} justify="center">
          <Grid xs={24} md={8}>
            <HomeCell
              icon={<PackageIcon />}
              url="/en-us/components"
              title="Components"
              desc="Ever-increasing list of concise and aesthetic components."
            />
          </Grid>
          <Grid xs={24} md={8}>
            <HomeCell
              icon={<FeatherIcon />}
              url="/en-us/guide/themes"
              title="Customizable"
              desc="Configure sizes, colors, appearances, shapes, and more."
            />
          </Grid>
          <Grid xs={24} md={8}>
            <HomeCell
              icon={<GitHubIcon />}
              url="https://github.com/geist-org/geist-ui"
              title="Open Sourced"
              desc="Geist is open sourced and available free under MIT licence."
            />
          </Grid>
        </Grid.Container>
      </div>
      <style jsx>{`
        .layout {
          min-height: calc(100vh - var(--geist-page-nav-height));
          max-width: ${theme.layout.pageWidthWithMargin};
          margin: 0 auto;
          padding: 0 ${theme.layout.gap} calc(${theme.layout.gap} * 2);
          box-sizing: border-box;
        }
        .hero {
          height: calc(100vh - var(--geist-page-nav-height) - 300px);
          min-height: 30vh;
          max-width: 500px;
          margin: 0 auto;
          text-align: center;
          align-items: center;
          justify-content: center;
          display: flex;
          flex-direction: column;
        }
        .title {
          font-size: 3.75rem;
          font-weight: 700;
          margin: 0;
        }
        .desc {
          color: ${theme.palette.accents_5};
          font-size: 1.5rem;
          font-weight: 500;
          margin: 0 0 ${theme.layout.gap};
        }
      `}</style>
    </>
  )
}

export default Application
